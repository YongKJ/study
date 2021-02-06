package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.dto.VocabularyGroupDto;

@Mapper
public interface PbVocabularyMapper {
	
	@Insert("INSERT INTO el_vocabulary (vocabularyUUID, userUUID, vocabularyTitle, vocabularyContent, vocabularyCategory, vocabularyAddTime) VALUES (#{vocabularyUUID}, #{userUUID}, #{vocabularyTitle}, #{vocabularyContent}, #{vocabularyCategory}, #{vocabularyAddTime})")
	void addVocabulary(VocabularyDto vocabularyDto);
	
	@Select("SELECT * FROM el_vocabulary WHERE vocabularyCategory like #{vocabularyCategory} ORDER BY vocabularyCategory")
	List<VocabularyDto> getVocabularyDtoByVocabularyCategory(@Param("vocabularyCategory") String vocabularyCategory);
	
	@Select("SELECT * FROM el_vocabulary WHERE userUUID=#{userUUID} AND vocabularyTitle=#{vocabularyTitle}")
	VocabularyDto getVocabularyDtoByUserUUIDAndVocabularyTitle(@Param("userUUID") String userUUID, @Param("vocabularyTitle") String vocabularyTitle);
	
	@Select("SELECT * FROM el_vocabulary WHERE userUUID=#{userUUID} AND vocabularyCategory=#{vocabularyCategory} ORDER BY vocabularyAddTime")
	List<VocabularyDto> getVocabularyDtosByUserUUIDAndVocabularyCategory(@Param("userUUID") String userUUID, @Param("vocabularyCategory") String vocabularyCategory);
	
	@Select("SELECT * FROM el_vocabulary WHERE vocabularyCategory=#{vocabularyCategory} ORDER BY vocabularyTitle")
	List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle(@Param("vocabularyCategory") String vocabularyCategory);
	
	@Select("SELECT * FROM el_vocabulary WHERE vocabularyCategory like #{vocabularyCategory} ORDER BY RAND() LIMIT #{start},#{pageSize}")
	List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByRand(@Param("vocabularyCategory") String vocabularyCategory, @Param("start") int start, @Param("pageSize") int pageSize);
	
	@Select("SELECT vocabularyCategory, COUNT( * ) as sum FROM `el_vocabulary` WHERE vocabularyCategory LIKE \"daily-use-common-vocabulary-%\" GROUP BY vocabularyCategory;")
	List<VocabularyGroupDto> getVocabularyDtoByVocabularyCategoryGroup();
	
	@Delete("DELETE FROM el_vocabulary WHERE vocabularyUUID=#{vocabularyUUID}")
	void delVocabularyDtoByVocabularyUUID(@Param("vocabularyUUID") String vocabularyUUID);
	
	@Delete("DELETE FROM el_vocabulary WHERE userUUID=#{userUUID}")
	void delVocabularyDtoByUserUUID(@Param("userUUID") String userUUID);

}
