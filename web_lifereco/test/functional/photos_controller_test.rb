require 'test_helper'

class PhotosControllerTest < ActionController::TestCase
  setup do
    @photo = photos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:photos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create photo" do
    assert_difference('Photo.count') do
      post :create, photo: { is_best_year_photo: @photo.is_best_year_photo, month: @photo.month, photo_path: @photo.photo_path, storage_path: @photo.storage_path, storage_vendor: @photo.storage_vendor, upload_date: @photo.upload_date }
    end

    assert_redirected_to photo_path(assigns(:photo))
  end

  test "should show photo" do
    get :show, id: @photo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @photo
    assert_response :success
  end

  test "should update photo" do
    put :update, id: @photo, photo: { is_best_year_photo: @photo.is_best_year_photo, month: @photo.month, photo_path: @photo.photo_path, storage_path: @photo.storage_path, storage_vendor: @photo.storage_vendor, upload_date: @photo.upload_date }
    assert_redirected_to photo_path(assigns(:photo))
  end

  test "should destroy photo" do
    assert_difference('Photo.count', -1) do
      delete :destroy, id: @photo
    end

    assert_redirected_to photos_path
  end
end
