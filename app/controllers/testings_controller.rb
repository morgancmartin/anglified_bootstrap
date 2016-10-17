class TestingsController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.json { render @users, status: 200 }
    end
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end
end
