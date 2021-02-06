package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.dto.VocabularyGroupDto;
import com.yongkj.study.mapper.PbVocabularyMapper;

@Service("vocabularyService")
public class VocabularyServiceImpl implements VocabularyService {
	
	@Autowired
	private PbVocabularyMapper pbVocabularyMapper;

	public void addVocabulary(VocabularyDto vocabularyDto) {
		pbVocabularyMapper.addVocabulary(vocabularyDto);
	}

	public List<VocabularyDto> getVocabularyDtoByVocabularyCategory(String vocabularyCategory) {
		return pbVocabularyMapper.getVocabularyDtoByVocabularyCategory(vocabularyCategory);
	}

	public List<VocabularyGroupDto> getVocabularyDtoByVocabularyCategoryGroup() {
		return pbVocabularyMapper.getVocabularyDtoByVocabularyCategoryGroup();
	}

	public List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle(String vocabularyCategory) {
		return pbVocabularyMapper.getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle(vocabularyCategory);
	}

	public List<VocabularyDto> getVocabularyDtoByVocabularyCategoryOrderByRand(String vocabularyCategory, int start, int pageSize) {
		return pbVocabularyMapper.getVocabularyDtoByVocabularyCategoryOrderByRand(vocabularyCategory, start, pageSize);
	}

	public VocabularyDto getVocabularyDtoByUserUUIDAndVocabularyTitle(String userUUID, String vocabularyTitle) {
		return pbVocabularyMapper.getVocabularyDtoByUserUUIDAndVocabularyTitle(userUUID, vocabularyTitle);
	}

	public void delVocabularyDtoByVocabularyUUID(String vocabularyUUID) {
		pbVocabularyMapper.delVocabularyDtoByVocabularyUUID(vocabularyUUID);
	}

	public List<VocabularyDto> getVocabularyDtosByUserUUIDAndVocabularyCategory(String userUUID, String vocabularyCategory) {
		return pbVocabularyMapper.getVocabularyDtosByUserUUIDAndVocabularyCategory(userUUID, vocabularyCategory);
	}

	@Override
	public void delVocabularyDtoByUserUUID(String userUUID) {
		pbVocabularyMapper.delVocabularyDtoByUserUUID(userUUID);
	}

}
