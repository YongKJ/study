package com.yongkj.study.service;

import com.yongkj.study.dto.CollectionDto;

public interface CollectionService {
	
	void addCollectionDtoByUserUUIDAndVocabularyUUID(CollectionDto collectionDto);
	
	void delCollectionDtoByUserUUIDAndVocabularyUUID(String userUUID, String vocabularyUUID);
	
	void delCollectionDtoByUserUUID(String userUUID);

}
