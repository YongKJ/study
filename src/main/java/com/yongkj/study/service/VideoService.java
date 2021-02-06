package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.VideoDto;

public interface VideoService {
	
	void addVideo(VideoDto videoDto);
	
	List<VideoDto> getVideoDtoByMaterialUUID(String materialUUID);

}
