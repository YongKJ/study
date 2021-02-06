package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.AudioDto;

public interface AudioService {
	
	void addAudio(AudioDto audioDto);
	
	List<AudioDto> getAudioDtoByMaterialUUID(String materialUUID);

}
