package com.yongkj.study.dto;

import java.io.Serializable;

public class AudioDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private String audioUUID;
	private String audioContent;
	private String audioPath;
	private String audioAddTime;
	private String materialUUID;
	
	public String getAudioUUID() {
		return audioUUID;
	}
	public void setAudioUUID(String audioUUID) {
		this.audioUUID = audioUUID;
	}
	public String getAudioContent() {
		return audioContent;
	}
	public void setAudioContent(String audioContent) {
		this.audioContent = audioContent;
	}
	public String getAudioPath() {
		return audioPath;
	}
	public void setAudioPath(String audioPath) {
		this.audioPath = audioPath;
	}
	public String getAudioAddTime() {
		return audioAddTime;
	}
	public void setAudioAddTime(String audioAddTime) {
		this.audioAddTime = audioAddTime;
	}
	public String getMaterialUUID() {
		return materialUUID;
	}
	public void setMaterialUUID(String materialUUID) {
		this.materialUUID = materialUUID;
	}
	
}
