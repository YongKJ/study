package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.AudioDto;
import com.yongkj.study.mapper.PbAudioMapper;

@Service("audioService")
public class AudioServiceImpl implements AudioService {
	
	@Autowired
	private PbAudioMapper pbAudioMapper;

	public void addAudio(AudioDto audioDto) {
		pbAudioMapper.addAudio(audioDto);
	}

	public List<AudioDto> getAudioDtoByMaterialUUID(String materialUUID) {
		return pbAudioMapper.getAudioDtoByMaterialUUID(materialUUID);
	}

}
