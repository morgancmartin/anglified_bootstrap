class TemplateApi

  def initialize(template_title)
    @template = Template.find_by_title(template_title)
  end

  def get_template_html
    @body = get_nokogirized_body
    @body.to_s
  end

  def get_index_url
    if @template.title == 'new-age'
      'https://raw.githubusercontent.com/morgancmartin/startbootstrap-new-age/master/index.html'
    else
      GithubApi.new.get_template_index_url(@template.repo_name)
    end
  end

  def get_nokogirized_body
    index_url = get_index_url
    extender = TemplateExtender.new(index_url)
    extender.add_attributes
    extender.doc.css('body').first
  end

end
