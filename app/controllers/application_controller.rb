class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def buildHTMLFile(data)
    File.open('public/repo/indexer.html', "w") do |file|
      file.write "<html>"
      file.write "<head>\n"
      file.write data[:head]
      file.write "\n</head>\n"
      file.write "<body>\n"
      file.write data[:body][:final]
      file.write "\n</body>\n"
      file.write "\n</html>"
    end
  end
end
