package com.yongkj.study.dto;

import java.io.Serializable;

public class VocabularyDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String vocabularyUUID;
	private String userUUID;
	private String vocabularyTitle;
	private String vocabularyContent;
	private String vocabularyCategory;
	private String vocabularyAddTime;
	
	public String getVocabularyUUID() {
		return vocabularyUUID;
	}
	public void setVocabularyUUID(String vocabularyUUID) {
		this.vocabularyUUID = vocabularyUUID;
	}
	public String getUserUUID() {
		return userUUID;
	}
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}
	public String getVocabularyTitle() {
		return vocabularyTitle;
	}
	public void setVocabularyTitle(String vocabularyTitle) {
		this.vocabularyTitle = vocabularyTitle;
	}
	public String getVocabularyContent() {
		return vocabularyContent;
	}
	public void setVocabularyContent(String vocabularyContent) {
		this.vocabularyContent = vocabularyContent;
	}
	public String getVocabularyCategory() {
		return vocabularyCategory;
	}
	public void setVocabularyCategory(String vocabularyCategory) {
		this.vocabularyCategory = vocabularyCategory;
	}
	public String getVocabularyAddTime() {
		return vocabularyAddTime;
	}
	public void setVocabularyAddTime(String vocabularyAddTime) {
		this.vocabularyAddTime = vocabularyAddTime;
	}
	
}
