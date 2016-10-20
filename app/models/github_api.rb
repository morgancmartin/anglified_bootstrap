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
    Dir.glob("#{directory_path}*") do |f|
      create_commit(repo_name, commit_message, f) if File.file?(f)
    end
  end

  def create_commit(repo_name, commit_message, file_path)
    puts 'commiting file: ' + file_path
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

  def repo_contents(repo_name, directory = nil)
    @client.contents(repo_name, path: directory)
  end

  def get_template_index_url(repo_name, directory = nil)
    contents = repo_contents(repo_name, directory)
    contents.each do |repo_content|
      if repo_content[:name] == 'index.html'
        return repo_content[:download_url]
      elsif repo_content[:type] == 'dir'
        index = get_template_index_url(repo_name, repo_content[:name])
        return index if index
      end
    end
    nil
  end

  def get_template_css_urls(repo_name, directory = nil)
    contents = repo_contents(repo_name, directory)
    files = []
    contents.each do |repo_content|
      if file_extension_of(repo_content[:name]) == 'css'
        files.push(repo_content[:download_url])
      elsif repo_content[:type] == 'dir'
        if directory
          inner_directory = "#{directory}/#{repo_content[:name]}"
        else
          inner_directory = repo_content[:name]
        end
        inner_files = get_template_css_urls(repo_name, inner_directory)
        files += inner_files
      end
    end
    files
  end

  def get_template_js_urls(repo_name, directory = nil)
    contents = repo_contents(repo_name, directory)
    files = []
    contents.each do |repo_content|
      if file_extension_of(repo_content[:name]) == 'js'
        files.push(repo_content[:download_url])
      elsif repo_content[:type] == 'dir'
        if directory
          inner_directory = "#{directory}/#{repo_content[:name]}"
        else
          inner_directory = repo_content[:name]
        end
        inner_files = get_template_js_urls(repo_name, inner_directory)
        files += inner_files
      end
    end
    files
  end

  def file_extension_of(file_name)
    splits = file_name.split('.')
    if splits.length > 1
      return splits.last
    end
    nil
  end

  def push_final_html_to_github
    repo_name = create_repo
    puts 'Created Repo: ' + repo_name
    commit_directory(repo_name, 'new page', 'public/repo/')
    "https://github.com/AnglifiedBootstrap/#{repo_name}"
  end
end
