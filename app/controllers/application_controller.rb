class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def buildHTMLFile(data)
    File.open('public/repo/index.html', "w") do |file|
      file.write "<html>"
      file.write data[:head]
      file.write data[:body][:final]
      file.write "\n</html>"
    end
  end
end
