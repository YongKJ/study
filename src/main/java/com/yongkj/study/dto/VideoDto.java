package com.yongkj.study.dto;

import java.io.Serializable;

public class VideoDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String videoUUID;
	private String videoContent;
	private String videoPath;
	private String videoAddTime;
	private String materialUUID;
	
	public String getVideoUUID() {
		return videoUUID;
	}
	public void setVideoUUID(String videoUUID) {
		this.videoUUID = videoUUID;
	}
	public String getVideoContent() {
		return videoContent;
	}
	public void setVideoContent(String videoContent) {
		this.videoContent = videoContent;
	}
	public String getVideoPath() {
		return videoPath;
	}
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
	}
	public String getVideoAddTime() {
		return videoAddTime;
	}
	public void setVideoAddTime(String videoAddTime) {
		this.videoAddTime = videoAddTime;
	}
	public String getMaterialUUID() {
		return materialUUID;
	}
	public void setMaterialUUID(String materialUUID) {
		this.materialUUID = materialUUID;
	}

}
