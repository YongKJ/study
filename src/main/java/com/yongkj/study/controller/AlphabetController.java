package com.yongkj.study.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongkj.study.basic.controller.BasicController;
import com.yongkj.study.dto.MaterialDto;
import com.yongkj.study.service.AudioService;
import com.yongkj.study.service.MaterialService;
import com.yongkj.study.service.PictureService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("alphabet")
public class AlphabetController extends BasicController {

	@Autowired
	@Qualifier("audioService")
	private AudioService audioService;
	
	@Autowired
	@Qualifier("materialService")
	private MaterialService materialService;
	
	@Autowired
	@Qualifier("pictureService")
	private PictureService pictureService;
	
	@ModelAttribute
	@RequestMapping("/getAlphabet")
	public void getEnglishAlphabet(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		List<MaterialDto> materialDtosList = materialService.getMaterialDtoByMaterialCategory("alphabet");
		for(MaterialDto materialDto : materialDtosList) {
			materialDto.setAudioDtosList(audioService.getAudioDtoByMaterialUUID(materialDto.getMaterialUUID()));
			materialDto.setPictureDtosList(pictureService.getPictureDtoByMaterialUUID(materialDto.getMaterialUUID()));
		}
		
		json.put("materialDtosList", materialDtosList);
		
		this.writeJson(json.toString(), response);
	}
	
}
