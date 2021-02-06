package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.VideoDto;
import com.yongkj.study.mapper.PbVideoMapper;

@Service("videoService")
public class VideoServiceImpl implements VideoService {
	
	@Autowired
	private PbVideoMapper pbVideoMapper;

	public void addVideo(VideoDto videoDto) {
		pbVideoMapper.addVideo(videoDto);
	}

	public List<VideoDto> getVideoDtoByMaterialUUID(String materialUUID) {
		return pbVideoMapper.getVideoDtoByMaterialUUID(materialUUID);
	}
	
	

}
