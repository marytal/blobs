class BlobsController < ApplicationController

  respond_to :json, :html
  
  def index
    @blobs = Blob.all
  end

  def show
    if params[:id] == "undefined"
      return redirect_to "/"
    else 
      @blob = Blob.find(params[:id])
      respond_with @blob
    end
  end

  def new 
  end

  def create
    if(params[:name] != "")
      blob = Blob.create({colour: params[:colour], name: params[:name]})
      respond_with blob
    end
  end

  def destroy
  end

  def update
    @blob = Blob.find(params[:id])
    if(params[:last_ate])
      @blob.update(last_ate: params[:last_ate])
    else
      @blob.update(last_pet: params[:last_pet])
    end
    render text: 'updated!'
  end

end
