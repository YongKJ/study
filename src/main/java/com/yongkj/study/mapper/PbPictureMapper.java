package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.yongkj.study.dto.PictureDto;

@Mapper
public interface PbPictureMapper {
	
	@Insert("INSERT INTO el_picture (pictureUUID, pictureContent, picturePath, pictureAddTime, materialUUID) VALUES (#{pictureUUID}, #{pictureContent}, #{picturePath}, #{pictureAddTime}, #{materialUUID})")
	void addPicture(PictureDto pictureDto);
	
	@Select("SELECT * FROM el_picture WHERE materialUUID=#{materialUUID} ORDER BY pictureContent")
	List<PictureDto> getPictureDtoByMaterialUUID(@Param("materialUUID") String materialUUID);
	
	@Select("SELECT * FROM el_picture WHERE materialUUID=#{materialUUID} AND pictureContent like #{pictureContent} ORDER BY pictureContent")
	List<PictureDto> getPictureDtoByMaterialUUIDAndPictureContent(@Param("materialUUID") String materialUUID, @Param("pictureContent") String pictureContent);

	@Update("UPDATE el_picture SET picturePath = #{picturePath} WHERE pictureUUID = #{pictureUUID}")
	void modPicturePath(PictureDto pictureDto);
	
	@Update("UPDATE el_picture SET pictureContent = #{pictureContent} WHERE pictureUUID = #{pictureUUID}")
	void modPictureContent(PictureDto pictureDto);
	
	@Delete("DELETE FROM el_picture WHERE materialUUID = #{materialUUID}")
	void delPicture(@Param("materialUUID") String materialUUID);
	
}
