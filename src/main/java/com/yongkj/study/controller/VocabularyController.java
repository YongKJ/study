package com.yongkj.study.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongkj.study.basic.controller.BasicController;
import com.yongkj.study.dto.MaterialDto;
import com.yongkj.study.dto.PictureDto;
import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.dto.VocabularyGroupDto;
import com.yongkj.study.service.MaterialService;
import com.yongkj.study.service.PictureService;
import com.yongkj.study.service.VocabularyService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/vocabulary")
public class VocabularyController extends BasicController {
	
	@Autowired
	@Qualifier("vocabularyService")
	private VocabularyService vocabularyService; 
	
	@Autowired
	@Qualifier("materialService")
	private MaterialService materialService; 
	
	@Autowired
	@Qualifier("pictureService")
	private PictureService pictureService; 
	
	@ModelAttribute
	@RequestMapping("/getHighSchoolVocabulary")
	public void getHighSchoolVocabulary(HttpServletRequest request,HttpServletResponse response, String course, String unit, String p) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		int pageSum = 1;
		int page = 1;
		int pageSize = 10;
		int start = -1;
		int end = -1;
		
		String vocabularyCategory = "%course%" + course + "-unit-" + unit;
		List<VocabularyDto> allVocabularyDtosList = vocabularyService.getVocabularyDtoByVocabularyCategory(vocabularyCategory);
		
		int listSum = allVocabularyDtosList.size();
		if(p == null) {
			start = 0;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}else {
			start = (Integer.valueOf(p) - 1) * pageSize;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}
		
		if(listSum % pageSize != 0) {
			pageSum = listSum / pageSize + 1;
        }else{
        	pageSum = listSum / pageSize;
        }
		if(p != null) {
			page = Integer.valueOf(p);
        }
		
		List<VocabularyDto> vocabularyDtosList = new ArrayList<VocabularyDto>();
		for(int i = start; i < end; i++) {
			vocabularyDtosList.add(allVocabularyDtosList.get(i));
		}
		
		json.put("vocabularyDtosList", vocabularyDtosList);
		
		json.put("page", page);
		json.put("pageSum", pageSum);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getCollegeCET4Vocabulary")
	public void getCollegeCET4Vocabulary(HttpServletRequest request,HttpServletResponse response, String letter, String p) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		int pageSum = 1;
		int page = 1;
		int pageSize = 10;
		int start = -1;
		int end = -1;
		int listSum = -1;
		
		String vocabularyCategory = "college-CET-4-" + letter;
		List<VocabularyDto> allVocabularyDtosList = new ArrayList<VocabularyDto>();
		if(!letter.equals("A-Z")) {
			allVocabularyDtosList = vocabularyService.getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle(vocabularyCategory);
			
			listSum = allVocabularyDtosList.size();
		}else {
			listSum = 4615;
		}
		
		
		if(p == null) {
			start = 0;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}else {
			start = (Integer.valueOf(p) - 1) * pageSize;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}
		
		if(listSum % pageSize != 0) {
			pageSum = listSum / pageSize + 1;
        }else{
        	pageSum = listSum / pageSize;
        }
		if(p != null) {
			page = Integer.valueOf(p);
        }
		
		List<VocabularyDto> vocabularyDtosList = new ArrayList<VocabularyDto>();
		if(!letter.equals("A-Z")) {
			for(int i = start; i < end; i++) {
				vocabularyDtosList.add(allVocabularyDtosList.get(i));
			}
		}else {
			Random random = new Random();
			start = (random.nextInt(462) + 1) * 10;
			pageSize = page == 462 ? 5 : 10;
			vocabularyCategory = "college-CET-4-%";
			vocabularyDtosList = vocabularyService.getVocabularyDtoByVocabularyCategoryOrderByRand(vocabularyCategory, start, pageSize);
		}
		
		
		json.put("vocabularyDtosList", vocabularyDtosList);
		
		json.put("page", page);
		json.put("pageSum", pageSum);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getDailyUseCommonVocabulary")
	public void getDailyUseCommonVocabulary(HttpServletRequest request,HttpServletResponse response, String p) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		int pageSum = 1;
		int page = 1;
		int pageSize = 5;
		int start = -1;
		int end = -1;
		
		List<VocabularyGroupDto> vocabularyGroupDtosList = vocabularyService.getVocabularyDtoByVocabularyCategoryGroup();
		List<MaterialDto> materialDtosList = materialService.getMaterialDtoByMaterialCategory("daily-use-common-vocabulary");
		
		int listSum = vocabularyGroupDtosList.size();
		if(p == null) {
			start = 0;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}else {
			start = (Integer.valueOf(p) - 1) * pageSize;
			end = start + pageSize <= listSum ? start + pageSize : listSum;
		}
		
		if(listSum % pageSize != 0) {
			pageSum = listSum / pageSize + 1;
        }else{
        	pageSum = listSum / pageSize;
        }
		if(p != null) {
			page = Integer.valueOf(p);
        }
		
		String materialUUID = materialDtosList.get(0).getMaterialUUID();
		for(int i = start; i < end; i++) {
			JSONObject vocabularyDtosListJsonObject = new JSONObject();
			
			List<VocabularyDto> vocabularyDtosList = vocabularyService.getVocabularyDtoByVocabularyCategoryOrderByVocabularyTitle(vocabularyGroupDtosList.get(i).getVocabularyCategory());
			List<PictureDto> pictureDtosList = pictureService.getPictureDtoByMaterialUUIDAndPictureContent(materialUUID, vocabularyGroupDtosList.get(i).getVocabularyCategory() + "%");
			
//			System.out.println(vocabularyGroupDtosList.get(i).getVocabularyCategory() + "%");
//			for(PictureDto pictureDto : pictureDtosList) {
//				System.out.println(pictureDto.getPicturePath());
//			}
//			System.out.println();
			
			vocabularyDtosListJsonObject.put("vocabularyDtosList", vocabularyDtosList);
			vocabularyDtosListJsonObject.put("pictureDtosList", pictureDtosList);

			String key = "vocabularyDtosList-" + i;
			json.put(key, vocabularyDtosListJsonObject);
			
//			System.out.println(vocabularyDtosList.size() + "----------" + vocabularyGroupDtosList.get(i).getSum() + "------------" + pictureDtosList.size());
		}
		
//		System.out.println(vocabularyGroupDtosList.size());
//		System.out.println(materialDtosList.size());
		
		json.put("page", page);
		json.put("pageSum", pageSum);
		
		this.writeJson(json.toString(), response);
	}

}
