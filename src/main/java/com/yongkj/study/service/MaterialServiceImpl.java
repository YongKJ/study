package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.MaterialDto;
import com.yongkj.study.mapper.PbMaterialMapper;

@Service("materialService")
public class MaterialServiceImpl implements MaterialService {
	
	@Autowired
	private PbMaterialMapper pbMaterialMapper;

	public void addMaterial(MaterialDto materialDto) {
		pbMaterialMapper.addMaterial(materialDto);
	}

	public void modMaterial(MaterialDto materialDto) {
		pbMaterialMapper.modMaterial(materialDto);
	}

	public void delMaterial(String materialUUID) {
		pbMaterialMapper.delMaterial(materialUUID);
	}

	public MaterialDto getMaterialDtoByMaterialUUID(String materialUUID) {
		return pbMaterialMapper.getMaterialDtoByMaterialUUID(materialUUID);
	}

	public List<MaterialDto> getMaterialDtoByMaterialCategory(String materialCategory) {
		return pbMaterialMapper.getMaterialDtoByMaterialCategory(materialCategory);
	}

	public List<MaterialDto> getMaterialDtoByMaterialCategoryOrderByMaterialAddTime(String materialCategory) {
		return pbMaterialMapper.getMaterialDtoByMaterialCategoryOrderByMaterialAddTime(materialCategory);
	}

}
