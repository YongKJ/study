package com.yongkj.study.dto;

import java.io.Serializable;

public class CollectionDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String userUUID;
	private String vocabularyUUID;
	private String collectionAddTime;
	
	public String getUserUUID() {
		return userUUID;
	}
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}
	public String getVocabularyUUID() {
		return vocabularyUUID;
	}
	public void setVocabularyUUID(String vocabularyUUID) {
		this.vocabularyUUID = vocabularyUUID;
	}
	public String getCollectionAddTime() {
		return collectionAddTime;
	}
	public void setCollectionAddTime(String collectionAddTime) {
		this.collectionAddTime = collectionAddTime;
	}
	
}
