package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.yongkj.study.dto.AudioDto;

@Mapper
public interface PbAudioMapper {
	
	@Insert("INSERT INTO el_audio (audioUUID, audioContent, audioPath, audioAddTime, materialUUID) VALUES (#{audioUUID}, #{audioContent}, #{audioPath}, #{audioAddTime}, #{materialUUID})")
	void addAudio(AudioDto audioDto);
	
	@Select("SELECT * FROM el_audio WHERE materialUUID=#{materialUUID} ORDER BY audioContent")
	List<AudioDto> getAudioDtoByMaterialUUID(@Param("materialUUID") String materialUUID);

}
