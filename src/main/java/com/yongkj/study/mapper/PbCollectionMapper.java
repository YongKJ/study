package com.yongkj.study.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.yongkj.study.dto.CollectionDto;

@Mapper
public interface PbCollectionMapper {
	
	@Insert("INSERT INTO el_collection (userUUID, vocabularyUUID, collectionAddTime) VALUES (#{userUUID}, #{vocabularyUUID}, #{collectionAddTime})")
	void addCollectionDtoByUserUUIDAndVocabularyUUID(CollectionDto collectionDto);
	
	@Delete("DELETE FROM el_collection WHERE userUUID=#{userUUID} AND vocabularyUUID=#{vocabularyUUID}")
	void delCollectionDtoByUserUUIDAndVocabularyUUID(@Param("userUUID") String userUUID, @Param("vocabularyUUID") String vocabularyUUID);
	
	@Delete("DELETE FROM el_collection WHERE userUUID=#{userUUID}")
	void delCollectionDtoByUserUUID(@Param("userUUID") String userUUID);

}
