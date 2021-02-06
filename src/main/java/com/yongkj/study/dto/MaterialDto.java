package com.yongkj.study.dto;

import java.io.Serializable;
import java.util.List;

public class MaterialDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private String materialUUID;
	private String userUUID;
	private String materialTitle;
	private String materialContent;
	private String materialCategory;
	private String materialAddTime;
	private List<AudioDto> audioDtosList;
	private List<PictureDto> pictureDtosList;
	private List<VideoDto> videoDtosList;
	
	public String getMaterialUUID() {
		return materialUUID;
	}
	public void setMaterialUUID(String materialUUID) {
		this.materialUUID = materialUUID;
	}
	public String getUserUUID() {
		return userUUID;
	}
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}
	public String getMaterialTitle() {
		return materialTitle;
	}
	public void setMaterialTitle(String materialTitle) {
		this.materialTitle = materialTitle;
	}
	public String getMaterialContent() {
		return materialContent;
	}
	public void setMaterialContent(String materialContent) {
		this.materialContent = materialContent;
	}
	public String getMaterialCategory() {
		return materialCategory;
	}
	public void setMaterialCategory(String materialCategory) {
		this.materialCategory = materialCategory;
	}
	public String getMaterialAddTime() {
		return materialAddTime;
	}
	public void setMaterialAddTime(String materialAddTime) {
		this.materialAddTime = materialAddTime;
	}
	public List<AudioDto> getAudioDtosList() {
		return audioDtosList;
	}
	public void setAudioDtosList(List<AudioDto> audioDtosList) {
		this.audioDtosList = audioDtosList;
	}
	public List<PictureDto> getPictureDtosList() {
		return pictureDtosList;
	}
	public void setPictureDtosList(List<PictureDto> pictureDtosList) {
		this.pictureDtosList = pictureDtosList;
	}
	public List<VideoDto> getVideoDtosList() {
		return videoDtosList;
	}
	public void setVideoDtosList(List<VideoDto> videoDtosList) {
		this.videoDtosList = videoDtosList;
	}
	
}
