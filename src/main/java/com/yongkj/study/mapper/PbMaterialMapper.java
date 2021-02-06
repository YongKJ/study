package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.yongkj.study.dto.MaterialDto;

@Mapper
public interface PbMaterialMapper {
	
	@Insert("INSERT INTO el_material (materialUUID, userUUID, materialTitle, materialContent, materialCategory, materialAddTime) VALUES (#{materialUUID}, #{userUUID}, #{materialTitle}, #{materialContent}, #{materialCategory}, #{materialAddTime})")
	void addMaterial(MaterialDto materialDto);

	@Update("UPDATE el_material SET materialTitle = #{materialTitle}, materialContent = #{materialContent}, materialCategory = #{materialCategory} WHERE materialUUID = #{materialUUID}")
	void modMaterial(MaterialDto materialDto);

	@Select("SELECT * FROM el_material WHERE materialUUID = #{materialUUID}")
	MaterialDto getMaterialDtoByMaterialUUID(@Param("materialUUID") String materialUUID);
	
	@Select("SELECT * FROM el_material WHERE materialCategory like #{materialCategory} ORDER BY materialCategory")
	List<MaterialDto> getMaterialDtoByMaterialCategory(@Param("materialCategory") String materialCategory);

	@Select("SELECT * FROM el_material WHERE materialCategory like #{materialCategory} ORDER BY materialAddTime DESC")
	List<MaterialDto> getMaterialDtoByMaterialCategoryOrderByMaterialAddTime(@Param("materialCategory") String materialCategory);

	@Delete("DELETE FROM el_material WHERE materialUUID = #{materialUUID}")
	void delMaterial(@Param("materialUUID") String materialUUID);
}
