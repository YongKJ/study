package com.yongkj.study.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.CollectionDto;
import com.yongkj.study.mapper.PbCollectionMapper;

@Service("collectionService")
public class CollectionServiceImpl implements CollectionService {
	
	@Autowired
	private PbCollectionMapper pbCollectionMapper;

	public void addCollectionDtoByUserUUIDAndVocabularyUUID(CollectionDto collectionDto) {
		pbCollectionMapper.addCollectionDtoByUserUUIDAndVocabularyUUID(collectionDto);
	}

	public void delCollectionDtoByUserUUIDAndVocabularyUUID(String userUUID, String vocabularyUUID) {
		pbCollectionMapper.delCollectionDtoByUserUUIDAndVocabularyUUID(userUUID, vocabularyUUID);
	}

	@Override
	public void delCollectionDtoByUserUUID(String userUUID) {
		pbCollectionMapper.delCollectionDtoByUserUUID(userUUID);
	}

}
