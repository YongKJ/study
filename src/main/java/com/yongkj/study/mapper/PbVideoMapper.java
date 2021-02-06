package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.yongkj.study.dto.VideoDto;

@Mapper
public interface PbVideoMapper {
	
	@Insert("INSERT INTO el_video (videoUUID, videoContent, videoPath, videoAddTime, materialUUID) VALUES (#{videoUUID}, #{videoContent}, #{videoPath}, #{videoAddTime}, #{materialUUID})")
	void addVideo(VideoDto videoDto);
	
	@Select("SELECT * FROM el_video WHERE materialUUID=#{materialUUID}")
	List<VideoDto> getVideoDtoByMaterialUUID(@Param("materialUUID") String materialUUID);

}
