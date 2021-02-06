package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.MaterialDto;

public interface MaterialService {
	
	void addMaterial(MaterialDto materialDto);

	void modMaterial(MaterialDto materialDto);

	void delMaterial(String materialUUID);

	MaterialDto getMaterialDtoByMaterialUUID( String materialUUID);
	
	List<MaterialDto> getMaterialDtoByMaterialCategory(String materialCategory);

	List<MaterialDto> getMaterialDtoByMaterialCategoryOrderByMaterialAddTime(String materialCategory);

}
