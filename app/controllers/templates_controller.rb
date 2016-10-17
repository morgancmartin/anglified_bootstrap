class TemplatesController < ApplicationController
  def index
  end

  def create
    @data = template_params
    respond_to do |format|
      format.json { render json: @data.to_json, status: 200 }
    end
  end

  private

    def template_params
      params.require(:template).permit(:home)
    end
end
