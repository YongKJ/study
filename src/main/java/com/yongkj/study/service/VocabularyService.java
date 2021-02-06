package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.dto.VocabularyGroupDto;

public interface VocabularyService {
	
	void addVocabulary(VocabularyDto vocabularyDto);
	
	List<VocabularyDto> getVocabularyDtoByVocabularyCategory(String vocabularyCategory);
	
	VocabularyDto getVocabularyDtoByUserUUIDAndVocabularyTitle(String userUUID, String vocabularyTitle);
	
	List<VocabularyDto> getVocabularyDtosByUserUUIDAndVocabularyCategory(String userUUID, String vocabularyCategory);
	
	List<VocabularyGroupDto> getVocabularyDtoByVocabularyCategoryGroup();
	
	List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle( String vocabularyCategory);
	
	List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByRand(String vocabularyCategory, int start, int pageSize);
	
	void delVocabularyDtoByVocabularyUUID(String vocabularyUUID);
	
	void delVocabularyDtoByUserUUID(String userUUID);

}
