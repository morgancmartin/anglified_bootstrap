class GithubApi
  attr_reader :client

  def initialize
    @client = Octokit::Client.new(:access_token =>
      Rails.application.secrets.github_api_access_token)
    @user = client.user
    @user.login
  end

  def create_repo(name = current_timestamp)
    repo = @client.create_repository(name, {:auto_init => true})
    repo.name
  end

  def current_timestamp
    Time.now.to_i
  end

  def commit_directory(repo_name, commit_message, directory_path)
    Dir.glob("#{directory_path}/*") do |f|
      create_commit(repo_name, commit_message, f) if File.file?(f)
    end
  end

  def create_commit(repo_name, commit_message, file_path)
    repo = "#{@user.login}/#{repo_name}"
    ref = 'heads/master'
    my_content = File.read(file_path)
    sha_latest_commit = @client.ref(repo, ref).object.sha
    sha_base_tree = @client.commit(repo, sha_latest_commit).commit.tree.sha
    blob_sha = @client.create_blob(repo, Base64.encode64(my_content), "base64")
    sha_new_tree = @client.create_tree(repo,
      [ { :path => file_path,
        :mode => "100644",
        :type => "blob",
        :sha => blob_sha } ],
      {:base_tree => sha_base_tree }).sha
    sha_new_commit = @client.create_commit(repo, commit_message, sha_new_tree, sha_latest_commit).sha
    @client.update_ref(repo, ref, sha_new_commit)
  end

end
