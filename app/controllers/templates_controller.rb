class TemplatesController < ApplicationController
  def index
    # set_nokogirized_template_by_url(params[:template_name])
    set_nokogirized_template_by_name('new-age')
  end

  def create
    @data = template_params
    ap @data
    respond_to do |format|
      format.json { render json: @data.to_json, status: 200 }
    end
  end




  private

    def template_params
      params.require(:template).permit(:home)
    end

    def set_nokogirized_template_by_name(name)
      t = TemplateExtender.new(name)
      t.add_attributes
      @template = t.doc.to_s
    end
end
