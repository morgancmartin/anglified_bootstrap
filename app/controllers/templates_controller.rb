class TemplatesController < ApplicationController
  before_action :set_github_instance

  def index
    @templates = Template.all.limit(12)
    respond_to do |format|
      format.json { render json: @templates, status: 200}
    end
  end

  def show
    @template = get_template
  end

  def create
    @data = template_params
    buildHTMLFile(@data)
    @github.push_final_html_to_github
    respond_to do |format|
      format.json { render json: @data.to_json, status: 200 }
    end
  end

  private

    def template_params
      params.require(:template).permit( [
            :head,
            { stuff: [ :type, { cached: [] } ] },
            { body: [ :withEdits, :final ] } ]
             )
    end

    def get_template
      template_title = Template.find_by_id(params[:id]).title
      TemplateApi.new(template_title).get_template_html
    end

    def set_github_instance
      @github = GithubApi.new
    end
end
