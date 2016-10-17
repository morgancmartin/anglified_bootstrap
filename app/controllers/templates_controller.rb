class TemplatesController < ApplicationController
  def index
  end

  def create
    ap params
    @data = template_params
    respond_to do |format|
      format.json { render json: @data.to_json, status: 200 }
    end
  end

  private

    def template_params
      params.require(:template).permit(:head, :body => [:withEdits, :final])
    end
end
