package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.PictureDto;

public interface PictureService {
	
	void addPicture(PictureDto pictureDto);
	
	List<PictureDto> getPictureDtoByMaterialUUID(String materialUUID);
	
	List<PictureDto> getPictureDtoByMaterialUUIDAndPictureContent(String materialUUID, String pictureContent);
	
	void modPicturePath(PictureDto pictureDto);
	
	void modPictureContent(PictureDto pictureDto);
	
	void delPicture(String materialUUID);

}
