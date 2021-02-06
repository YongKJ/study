package com.yongkj.study.dto;

import java.io.Serializable;

public class PictureDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String pictureUUID;
	private String pictureContent;
	private String picturePath;
	private String pictureAddTime;
	private String materialUUID;
	
	public String getPictureUUID() {
		return pictureUUID;
	}
	public void setPictureUUID(String pictureUUID) {
		this.pictureUUID = pictureUUID;
	}
	public String getPictureContent() {
		return pictureContent;
	}
	public void setPictureContent(String pictureContent) {
		this.pictureContent = pictureContent;
	}
	public String getPicturePath() {
		return picturePath;
	}
	public void setPicturePath(String picturePath) {
		this.picturePath = picturePath;
	}
	public String getPictureAddTime() {
		return pictureAddTime;
	}
	public void setPictureAddTime(String pictureAddTime) {
		this.pictureAddTime = pictureAddTime;
	}
	public String getMaterialUUID() {
		return materialUUID;
	}
	public void setMaterialUUID(String materialUUID) {
		this.materialUUID = materialUUID;
	}
	
}
