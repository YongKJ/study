package com.yongkj.study.dto;

import java.io.Serializable;

public class VocabularyGroupDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String vocabularyCategory;
	private String sum;
	
	public String getVocabularyCategory() {
		return vocabularyCategory;
	}
	public void setVocabularyCategory(String vocabularyCategory) {
		this.vocabularyCategory = vocabularyCategory;
	}
	public String getSum() {
		return sum;
	}
	public void setSum(String sum) {
		this.sum = sum;
	}
	
	

}
