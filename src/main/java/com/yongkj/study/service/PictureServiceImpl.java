package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.PictureDto;
import com.yongkj.study.mapper.PbPictureMapper;

@Service("pictureService")
public class PictureServiceImpl implements PictureService {
	
	@Autowired
	private PbPictureMapper pbPictureMapper;

	public void addPicture(PictureDto pictureDto) {
		pbPictureMapper.addPicture(pictureDto);
	}

	public List<PictureDto> getPictureDtoByMaterialUUID(String materialUUID) {
		return pbPictureMapper.getPictureDtoByMaterialUUID(materialUUID);
	}

	public List<PictureDto> getPictureDtoByMaterialUUIDAndPictureContent(String materialUUID, String pictureContent) {
		return pbPictureMapper.getPictureDtoByMaterialUUIDAndPictureContent(materialUUID, pictureContent);
	}

	@Override
	public void modPicturePath(PictureDto pictureDto) {
		pbPictureMapper.modPicturePath(pictureDto);
	}

	@Override
	public void modPictureContent(PictureDto pictureDto) {
		pbPictureMapper.modPictureContent(pictureDto);
	}

	@Override
	public void delPicture(String materialUUID) {
		pbPictureMapper.delPicture(materialUUID);
	}

}
