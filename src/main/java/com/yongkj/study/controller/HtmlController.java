package com.yongkj.study.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongkj.study.basic.controller.BasicController;
import com.yongkj.study.dto.AudioDto;
import com.yongkj.study.dto.MaterialDto;
import com.yongkj.study.dto.PictureDto;
import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.service.AudioService;
import com.yongkj.study.service.MaterialService;
import com.yongkj.study.service.PictureService;
import com.yongkj.study.service.UserService;
import com.yongkj.study.service.VocabularyService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/html")
public class HtmlController extends BasicController {
	
	@Autowired
	@Qualifier("audioService")
	private AudioService audioService;
	
	@Autowired
	@Qualifier("materialService")
	private MaterialService materialService;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("pictureService")
	private PictureService pictureService;
	
	@Autowired
	@Qualifier("vocabularyService")
	private VocabularyService vocabularyService;
	
	@ModelAttribute
	@RequestMapping("/addVocabularyPicture")
	public void getEnglishAddVocabularyPicture(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
		MaterialDto materialDto = new MaterialDto();
	    String materialUUID = this.getUUID();
	    materialDto.setMaterialUUID(materialUUID);
	    materialDto.setUserUUID(userUUID);
	    materialDto.setMaterialTitle("90幅图记1000个单词");
	    materialDto.setMaterialContent("90幅图记1000个单词");
	    materialDto.setMaterialCategory("daily-use-common-vocabulary");
	    materialDto.setMaterialAddTime(this.getStringDate(new Date()));
//	    materialService.addMaterial(materialDto);
		
		
		File dir = new File("src/main/resources/static/img/daily-use-common-vocabulary");
		File[] fileList = dir.listFiles();
		for(File file : fileList) {
			List<File> pictures = (List<File>)FileUtils.listFiles(new File("src/main/resources/static/img/daily-use-common-vocabulary/" + file.getName()),null,false);
			for(int i = 0; i < pictures.size(); i++) {
				PictureDto pictureDto = new PictureDto();
				pictureDto.setPictureUUID(this.getUUID());
				pictureDto.setPictureContent("daily-use-common-vocabulary-" + file.getName() + "-" + (i + 1));
				pictureDto.setPicturePath("img/" + pictures.get(i).getName());
				pictureDto.setPictureAddTime(this.getStringDate(new Date()));
				pictureDto.setMaterialUUID(materialUUID);
//				pictureService.addPicture(pictureDto);
			}
		}
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/addVocabulary")
	public void getEnglishAddVocabulary(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
//		readFile(new File("src/main/resources/static/senior-high-school/compulsory-course"), "senior-high-school-compulsory-course-");
//		readFile(new File("src/main/resources/static/senior-high-school/elective-course"), "senior-high-school-elective-course");
//		readCET4File(new File("src/main/resources/static/college/CET-4"), "college-CET-4-");
//		readCommentVocabularyFile(new File("src/main/resources/static/daily-use/common-vocabulary"), "daily-use-common-vocabulary-");
		
		this.writeJson(json.toString(), response);
	}
	
	public void readCommentVocabularyFile(File dir, String type) throws Exception {
		int num = 0;
		List<File> fileList = (List<File>)FileUtils.listFiles(dir,null,false);
		for(int i = 0; i < fileList.size(); i++) {
			Long fileLength = fileList.get(i).length();
			byte[] fileContent = new byte[fileLength.intValue()];
			FileInputStream fileInputStream = new FileInputStream(fileList.get(i));
			fileInputStream.read(fileContent);
			fileInputStream.close();
			String content = new String(fileContent,"UTF-8");
			
			int sum = 0;
			String[] parts = content.split("\r\n\r\nUnit\r\n\r\n");
			for(int j = 0; j < parts.length; j++) {
				
				String[] vocabularys = parts[j].split("\r\n");
				sum += vocabularys.length - 1;
//				System.out.println(type + vocabularys[0]);
				
				for(int k = 1; k < vocabularys.length; k++) {
					String[] vocabulary = vocabularys[k].split("\\*");
					
					String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
					VocabularyDto vocabularyDto = new VocabularyDto();
					vocabularyDto.setVocabularyUUID(this.getUUID());
					vocabularyDto.setUserUUID(userUUID);
					vocabularyDto.setVocabularyTitle(vocabulary[0]);
					vocabularyDto.setVocabularyContent(vocabulary[1]);
					vocabularyDto.setVocabularyCategory(type + vocabularys[0]);
					vocabularyDto.setVocabularyAddTime(this.getStringDate(new Date()));
//					vocabularyService.addVocabulary(vocabularyDto);
					
					if(vocabulary.length > 2) {
						System.out.println(vocabularys[k]);
					}
					if(vocabularys[k].indexOf("*") == -1) {
						System.out.println(vocabularys[k]);
					}
				}
				System.out.println(type + vocabularys[0] + "----" + (vocabularys.length - 1));
			}
			num += sum;
		}
		
		System.out.println("单词总数：" + num);
	}
	
	public void readCET4File(File dir, String type) throws Exception {
		int num = 0;
		List<File> fileList = (List<File>)FileUtils.listFiles(dir,null,false);
		
		for(int i = 0; i < fileList.size(); i++) {
			Long fileLength = fileList.get(i).length();
			byte[] fileContent = new byte[fileLength.intValue()];
			FileInputStream fileInputStream = new FileInputStream(fileList.get(i));
			fileInputStream.read(fileContent);
			fileInputStream.close();
			String content = new String(fileContent,"UTF-8");
			content = content.substring(1, content.length());
			
			int sum = 0;
			String[] parts = content.split("\n\nUnit\n\n");
			String letter = null;
			System.out.println(parts.length);
//			char[] a = parts[0].substring(0, 1).toCharArray();
//			System.out.println((int)a[0] + "*********************");
			for(int j = 0; j < parts.length; j++) {
				
				letter = parts[j].substring(0, 1).toUpperCase();
				System.out.println(letter);
				
				String[] vocabularys = parts[j].split("\n");
				sum += vocabularys.length;
				
				for(int k = 0; k < vocabularys.length; k++) {
					String[] vocabulary = vocabularys[k].split("\\*");
					
					String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
					VocabularyDto vocabularyDto = new VocabularyDto();
					vocabularyDto.setVocabularyUUID(this.getUUID());
					vocabularyDto.setUserUUID(userUUID);
					vocabularyDto.setVocabularyTitle(vocabulary[0]);
					vocabularyDto.setVocabularyContent(vocabulary[1]);
					vocabularyDto.setVocabularyCategory(type + letter);
					vocabularyDto.setVocabularyAddTime(this.getStringDate(new Date()));
//					vocabularyService.addVocabulary(vocabularyDto);
					
					if(vocabulary.length > 2) {
						System.out.println(vocabularys[k]);
					}
					if(vocabularys[k].indexOf("*") == -1) {
						System.out.println(vocabularys[k]);
					}
				}
				
				System.out.println(type + letter + "--------" + vocabularys.length);
			}

			num += sum;
		}
		
		System.out.println("单词总数：" + num);
	}
	
	public void readFile(File dir, String type) throws Exception {
		int num = 0;
		List<File> fileList = (List<File>)FileUtils.listFiles(dir,null,false);
		
		for(int i = 0; i < fileList.size(); i++) {
			System.out.println(fileList.get(i).getName());
		}
		
		for(int i = 0; i < fileList.size(); i++) {
			Long fileLength = fileList.get(i).length();
			byte[] fileContent = new byte[fileLength.intValue()];
			FileInputStream fileInputStream = new FileInputStream(fileList.get(i));
			fileInputStream.read(fileContent);
			fileInputStream.close();
			String content = new String(fileContent,"UTF-8");
			
			int sum = 0;
			String[] parts = content.split("\r\n\r\nUnit\r\n\r\n");
			for(int j = 0; j < parts.length; j++) {
				
				String[] vocabularys = parts[j].split("\r\n");
				System.out.println(type + (i + (type.indexOf("elective") == -1 ? 1 : 6)) + "-unit-" + (j + 1) + "------" + vocabularys.length);
				sum += vocabularys.length;
				
				for(int k = 0; k < vocabularys.length; k++) {
					String[] vocabulary = vocabularys[k].split("\\*");
					
					String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
					VocabularyDto vocabularyDto = new VocabularyDto();
					vocabularyDto.setVocabularyUUID(this.getUUID());
					vocabularyDto.setUserUUID(userUUID);
					vocabularyDto.setVocabularyTitle(vocabulary[0]);
					vocabularyDto.setVocabularyContent(vocabulary[1]);
					vocabularyDto.setVocabularyCategory(type + (i + (type.indexOf("elective") == -1 ? 1 : 6)) + "-unit-" + (j + 1));
					vocabularyDto.setVocabularyAddTime(this.getStringDate(new Date()));
//					vocabularyService.addVocabulary(vocabularyDto);
					
					if(vocabulary.length > 2) {
						System.out.println(vocabularys[k]);
//						System.out.println(vocabulary.length);
					}
					if(vocabularys[k].indexOf("*") == -1) {
						System.out.println(vocabularys[k]);
					}
				}
			}
			
			System.out.println(type + (i + (type.indexOf("elective") == -1 ? 1 : 6)) + "----" + sum);
			num += sum;
		}
		
		System.out.println("单词总数：" + num);
	}
	
	@ModelAttribute
	@RequestMapping("/phoneticSymbol-1")
	public void getEnglishPhoneticSymbol1(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
		
		File dir = new File("src/main/resources/static/audio/f/q");
		List<File> fileList = (List<File>)FileUtils.listFiles(dir,null,false);
		for(File f : fileList) {
			String name = f.getName().substring(0, f.getName().lastIndexOf("."));
			System.out.println(name);
			AudioDto audioDto = new AudioDto();
	    	audioDto.setAudioUUID(this.getUUID());
	    	audioDto.setAudioContent("/" + name + "/");
	    	audioDto.setAudioPath("audio/" + f.getName());
	    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
	    	audioDto.setMaterialUUID("c0ad5f5fcaf94487a13fb1977d78f533");
//	    	audioService.addAudio(audioDto);
			
		}
		
		File dir1 = new File("src/main/resources/static/audio/f/z");
		List<File> fileList1 = (List<File>)FileUtils.listFiles(dir1,null,false);
		
		for(int i = 0; i < 2; i++) {
			String name = fileList1.get(i).getName().substring(0, fileList1.get(i).getName().lastIndexOf("."));
			System.out.println(name);
			AudioDto audioDto = new AudioDto();
	    	audioDto.setAudioUUID(this.getUUID());
	    	audioDto.setAudioContent("/" + name + "/");
	    	audioDto.setAudioPath("audio/" + fileList1.get(i).getName());
	    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
	    	audioDto.setMaterialUUID("198daf05ad8b4754a71da23032eb47be");
//	    	audioService.addAudio(audioDto);
		}
		
		MaterialDto materialDto = new MaterialDto();
	    String materialUUID = this.getUUID();
	    materialDto.setMaterialUUID(materialUUID);
	    materialDto.setUserUUID(userUUID);
	    materialDto.setMaterialTitle("英语元音");
	    materialDto.setMaterialContent("上下行清浊相对");
	    materialDto.setMaterialCategory("consonant-turbid-4");
	    materialDto.setMaterialAddTime(this.getStringDate(new Date()));
//	    materialService.addMaterial(materialDto);
	    
		for(int i = 2; i < 6; i++) {
			String name = fileList1.get(i).getName().substring(0, fileList1.get(i).getName().lastIndexOf("."));
			System.out.println(name);
			AudioDto audioDto = new AudioDto();
	    	audioDto.setAudioUUID(this.getUUID());
	    	audioDto.setAudioContent("/" + name + "/");
	    	audioDto.setAudioPath("audio/" + fileList1.get(i).getName());
	    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
	    	audioDto.setMaterialUUID(materialUUID);
//	    	audioService.addAudio(audioDto);
		}
		
		MaterialDto materialDto1 = new MaterialDto();
	    String materialUUID1 = this.getUUID();
	    materialDto1.setMaterialUUID(materialUUID1);
	    materialDto1.setUserUUID(userUUID);
	    materialDto1.setMaterialTitle("英语元音");
	    materialDto1.setMaterialContent("上下行清浊相对");
	    materialDto1.setMaterialCategory("consonant-turbid-5");
	    materialDto1.setMaterialAddTime(this.getStringDate(new Date()));
//	    materialService.addMaterial(materialDto1);
	    
		for(int i = 6; i < fileList1.size(); i++) {
			String name = fileList1.get(i).getName().substring(0, fileList1.get(i).getName().lastIndexOf("."));
			System.out.println(name);
			AudioDto audioDto = new AudioDto();
	    	audioDto.setAudioUUID(this.getUUID());
	    	audioDto.setAudioContent("/" + name + "/");
	    	audioDto.setAudioPath("audio/" + fileList1.get(i).getName());
	    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
	    	audioDto.setMaterialUUID(materialUUID1);
//	    	audioService.addAudio(audioDto);
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/phoneticSymbol")
	public void getEnglishPhoneticSymbol(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
		
		try {
			Document doc = Jsoup.connect("https://yingyuyinbiao.cn/category/yinbiao/").get();
		    Elements materials = doc.getElementsByAttributeValue("class", "wp-block-table is-style-regular");
		    System.out.println(materials.size());
		    int n = 1;
		    for(Element m : materials) {
		    	String title = Jsoup.parse(m.select("th").first().text()).text();
		    	if(!title.equals("上下行清浊相对：")) {
				    System.out.println(title);
				    
				    MaterialDto materialDto = new MaterialDto();
				    String materialUUID = this.getUUID();
				    materialDto.setMaterialUUID(materialUUID);
				    materialDto.setUserUUID(userUUID);
				    materialDto.setMaterialTitle("英语元音");
				    materialDto.setMaterialContent(title);
				    materialDto.setMaterialCategory("vowel-" + n++);
				    materialDto.setMaterialAddTime(this.getStringDate(new Date()));
//				    materialService.addMaterial(materialDto);
				    
				    List<String> phoneticSymbols = new ArrayList<String>();
				    Elements tds = m.select("tbody").select("td");
				    for(Element td : tds) {
				    	String audioContent = Jsoup.parse(td.select("strong").text()).text();
				    	if(!audioContent.equals("")) {
					    	audioContent = audioContent.substring(0, audioContent.lastIndexOf("/") + 1);
					    	phoneticSymbols.add(audioContent);
//					    	System.out.println(audioContent);
				    	}
				    }
//				    System.out.println(tds.size() + "\n\n");
				    

				    Elements inputs = m.getElementsByAttributeValue("class", "myButton_play");
				    for(int i = 0; i < inputs.size(); i++) {
				    	String onclick = inputs.get(i).attr("onclick");
				    	String fileUrl = onclick.substring(onclick.lastIndexOf("http"), onclick.lastIndexOf("mp3") + 3);
				    	System.out.println(phoneticSymbols.get(i) + "  " + fileUrl);
				    	
				    	String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length());
						String filePath = "src/main/resources/static/audio/" + fileName;
						
						URL url = new URL(fileUrl);
						FileUtils.copyURLToFile(url, new File(filePath));
				    	
				    	AudioDto audioDto = new AudioDto();
				    	audioDto.setAudioUUID(this.getUUID());
				    	audioDto.setAudioContent(phoneticSymbols.get(i));
				    	audioDto.setAudioPath("audio/" + fileName);
				    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
				    	audioDto.setMaterialUUID(materialUUID);
//				    	audioService.addAudio(audioDto);
				    }
		    	}else {
		    		String title1 = "英语辅音";
		    		System.out.println(title1);
		    		
		    		
		    		Elements trs = m.select("tbody").select("tr");
		    		for(int i = 0, j = 0, k = 1; i < trs.size(); i++) {
//		    			System.out.println(Jsoup.parse(trs.get(i).text()).text().equals(""));
		    			if(Jsoup.parse(trs.get(i).text()).text().equals("")) {
		    				continue;
		    			}
		    			if(j % 2 == 0) {
		    				j++;
		    				System.out.println("清  " + i + "  " + k);
		    				
		    				MaterialDto materialDto = new MaterialDto();
						    String materialUUID = this.getUUID();
						    materialDto.setMaterialUUID(materialUUID);
						    materialDto.setUserUUID(userUUID);
						    materialDto.setMaterialTitle("英语辅音");
						    materialDto.setMaterialContent("上下行清浊相对");
						    materialDto.setMaterialCategory("consonant-vivid-" + k);
						    materialDto.setMaterialAddTime(this.getStringDate(new Date()));
//						    materialService.addMaterial(materialDto);
		    				
		    				List<String> phoneticSymbols = new ArrayList<String>();
		    				Elements tds = trs.get(i).select("td");
		    				for(Element td : tds) {
						    	String audioContent = Jsoup.parse(td.select("strong").text()).text();
						    	if(!audioContent.equals("")) {
							    	audioContent = audioContent.substring(0, audioContent.indexOf("/", 1) + 1);
							    	phoneticSymbols.add(audioContent);
//							    	System.out.println(audioContent);
						    	}
						    }
		    				
		    				Elements inputs = trs.get(i).getElementsByAttributeValue("class", "myButton_play");
						    for(int i1 = 0; i1 < inputs.size(); i1++) {
						    	String onclick = inputs.get(i1).attr("onclick");
						    	String fileUrl = onclick.substring(onclick.lastIndexOf("http"), onclick.lastIndexOf("mp3") + 3);
						    	System.out.println(phoneticSymbols.get(i1) + "  " + fileUrl);
						    	
						    	String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length());
								String filePath = "src/main/resources/static/audio/" + fileName;
								
								URL url = new URL(fileUrl);
								FileUtils.copyURLToFile(url, new File(filePath));
						    	
						    	AudioDto audioDto = new AudioDto();
						    	audioDto.setAudioUUID(this.getUUID());
						    	audioDto.setAudioContent(phoneticSymbols.get(i1));
						    	audioDto.setAudioPath("audio/" + fileName);
						    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
						    	audioDto.setMaterialUUID(materialUUID);
//						    	audioService.addAudio(audioDto);
						    }
						    
//						    System.out.println(tds.size() + "   " + trs.size());
		    			}else {
		    				j++;
		    				System.out.println("浊  " + i + "  " + k);
		    				
		    				MaterialDto materialDto = new MaterialDto();
						    String materialUUID = this.getUUID();
						    materialDto.setMaterialUUID(materialUUID);
						    materialDto.setUserUUID(userUUID);
						    materialDto.setMaterialTitle("英语辅音");
						    materialDto.setMaterialContent("上下行清浊相对");
						    materialDto.setMaterialCategory("consonant-turbid-" + k);
						    materialDto.setMaterialAddTime(this.getStringDate(new Date()));
//						    materialService.addMaterial(materialDto);
		    				
		    				List<String> phoneticSymbols = new ArrayList<String>();
		    				Elements tds = trs.get(i).select("td");
		    				for(Element td : tds) {
						    	String audioContent = Jsoup.parse(td.select("strong").text()).text();
						    	if(!audioContent.equals("")) {
							    	audioContent = audioContent.substring(0, audioContent.indexOf("/", 1) + 1);
							    	phoneticSymbols.add(audioContent);
//							    	System.out.println(audioContent);
						    	}
						    }
		    				
		    				Elements inputs = trs.get(i).getElementsByAttributeValue("class", "myButton_play");
						    for(int i1 = 0; i1 < inputs.size(); i1++) {
						    	String onclick = inputs.get(i1).attr("onclick");
						    	String fileUrl = onclick.substring(onclick.lastIndexOf("http"), onclick.lastIndexOf("mp3") + 3);
						    	System.out.println(phoneticSymbols.get(i1) + "  " + fileUrl);
						    	
						    	String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length());
								String filePath = "src/main/resources/static/audio/" + fileName;
								
								URL url = new URL(fileUrl);
								FileUtils.copyURLToFile(url, new File(filePath));
						    	
						    	AudioDto audioDto = new AudioDto();
						    	audioDto.setAudioUUID(this.getUUID());
						    	audioDto.setAudioContent(phoneticSymbols.get(i1));
						    	audioDto.setAudioPath("audio/" + fileName);
						    	audioDto.setAudioAddTime(this.getStringDate(new Date()));
						    	audioDto.setMaterialUUID(materialUUID);
//						    	audioService.addAudio(audioDto);
						    }
						    
//						    System.out.println(tds.size() + "   " + trs.size());
						    k++;
		    			}
		    		}
		    	}
		    }
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/alphabetPicture")
	public void getEnglishAlphabetPicture(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		File dir = new File("src/main/resources/static/img");
		List<File> fileList = (List<File>)FileUtils.listFiles(dir,null,false);
		for(File f : fileList) {
			System.out.println(f.getName());
			if(f.getName().indexOf("default") == -1) {
				PictureDto pictureDto = new PictureDto();
				pictureDto.setPictureUUID(this.getUUID());
				pictureDto.setPictureContent(f.getName().substring(0, f.getName().lastIndexOf(".")));
				pictureDto.setPicturePath("img/" + f.getName());
				pictureDto.setPictureAddTime(this.getStringDate(new Date()));
				pictureDto.setMaterialUUID("61518cac24dc42969470928bf9e16c07");
				pictureService.addPicture(pictureDto);
			}
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/alphabet")
	public void getEnglishAlphabet(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		try {
			Document doc = Jsoup.connect("https://yingyuyinbiao.cn/2020/09/06/26%E4%B8%AA%E8%8B%B1%E8%AF%AD%E5%AD%97%E6%AF%8D%E5%8F%91%E9%9F%B3%E8%A1%A8/").get();
			
//			UserDto userDto = new UserDto();
//			String userUUID = this.getUUID();
//			String md5Password = this.md5("1314520");
//			userDto.setUserUUID(userUUID);
//			userDto.setUserName("admin");
//			userDto.setUserPassword(md5Password);
//			userDto.setUserSex("男");
//			userDto.setUserAge(22);
//			userDto.setUserEmail("dxj1718874198@gmail.com");
//			userDto.setUserHeadPortraitPath("img/default.jpg");
//			userDto.setUserRegTime(this.getStringDate(new Date()));
//			userDto.setAdmin("1");
//			userService.addUser(userDto);
			
			String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
			
			MaterialDto materialDto = new MaterialDto();
			String materialUUID = this.getUUID();
			String ps = doc.getElementsByAttributeValue("class", "entry-content").select("p").text();
			materialDto.setMaterialUUID(materialUUID);
			materialDto.setUserUUID(userUUID);
			materialDto.setMaterialTitle(doc.title());
			materialDto.setMaterialContent(Jsoup.parse(ps).text().replace("英语字母和英语音标有什么区别？", "#"));
			materialDto.setMaterialCategory("alphabet");
			materialDto.setMaterialAddTime(this.getStringDate(new Date()));
			materialService.addMaterial(materialDto);
			
			String[] alphabet = new String[26];
			
			Elements tds = doc.select("table").select("tbody").select("td");
			for(int i = 0, j = 0; i < tds.size(); i++) {
				Element strong = tds.get(i).select("strong").first();
				if(strong != null) {
					alphabet[j++] = Jsoup.parse(strong.text()).text();
				}
			}

			Elements inputs = doc.getElementsByAttributeValue("class", "myButton_play");
			for(int i = 0; i < inputs.size(); i++) {
				String onclick = inputs.get(i).attr("onclick");
				String regex = "((https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])";
				Pattern pattern = Pattern.compile(regex);
				Matcher matcher = pattern.matcher(onclick);
				if(matcher.find()) {
					String fileUrl = matcher.group(1);
					String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length());
					String filePath = "src/main/resources/static/audio/" + fileName;
					
					URL url = new URL(fileUrl);
					FileUtils.copyURLToFile(url, new File(filePath));
					
					AudioDto audioDto = new AudioDto();
					audioDto.setAudioUUID(this.getUUID());
					audioDto.setAudioContent(alphabet[i]);
					audioDto.setAudioPath("audio/" + fileName);
					audioDto.setAudioAddTime(this.getStringDate(new Date()));
					audioDto.setMaterialUUID(materialUUID);
					audioService.addAudio(audioDto);
				}
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/test")
	public void testHtml(HttpServletRequest request,HttpServletResponse response) {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		
		
		try {
			Document doc = Jsoup.connect("https://yingyuyinbiao.cn/2020/09/06/26%E4%B8%AA%E8%8B%B1%E8%AF%AD%E5%AD%97%E6%AF%8D%E5%8F%91%E9%9F%B3%E8%A1%A8/").get();
////			json.put("tr", doc.select("table").select("tbody").select("tr"));
////			System.out.println(doc.select("table").select("tbody").select("tr"));
//			
//			Elements tds = doc.select("table").select("tbody").select("td");
//			for(int i = 0; i < tds.size(); i++) {
//				Element strong = tds.get(i).select("strong").first();
//				if(strong != null) {
//					System.out.println(Jsoup.parse(strong.text()).text());
//				}
////				Elements tds = trs.get(i).select("td");
////				for(int j = 0; j < tds.size(); j++) {
//////					String text = tds.get(j).select("strong").text();
////					List<TextNode> text = tds.get(j).select("strong").textNodes();
////					if(text.size() != 0) {
////						String t = text.get(0).toString();
////						System.out.println(t);
////					}
////				}
//			}
//			
//			Elements inputs = doc.getElementsByAttributeValue("class", "myButton_play");
////			System.out.println(inputs.size());
//			for(int i = 0; i < inputs.size(); i++) {
//				String onclick = inputs.get(i).attr("onclick");
//				String regex = "((https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])";
//				Pattern pattern = Pattern.compile(regex);
//				Matcher matcher = pattern.matcher(onclick);
//				if(matcher.find()) {
//					System.out.println(matcher.group(1));
//				}
//			}
			
			String[][] alphabet = new String[26][26];
			
			Elements tds = doc.select("table").select("tbody").select("td");
			for(int i = 0, j = 0; i < tds.size(); i++) {
				Element strong = tds.get(i).select("strong").first();
				if(strong != null) {
					alphabet[0][j++] = Jsoup.parse(strong.text()).text();
				}
			}

			Elements inputs = doc.getElementsByAttributeValue("class", "myButton_play");
			for(int i = 0, j = 0; i < inputs.size(); i++) {
				String onclick = inputs.get(i).attr("onclick");
				String regex = "((https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])";
				Pattern pattern = Pattern.compile(regex);
				Matcher matcher = pattern.matcher(onclick);
				if(matcher.find()) {
					alphabet[1][j++] = matcher.group(1);
				}
			}
			
			for(int i = 0; i < 26; i++) {
				System.out.println(alphabet[0][i] + " " + alphabet[1][i] + " " + alphabet[1][i].substring(alphabet[1][i].lastIndexOf("/") + 1, alphabet[1][i].length()));
			}
			
			File directory = new File("src/main/resources");
			String reportPath = directory.getCanonicalPath();
//			String basePath = System.getProperty("user.dir");
			System.out.println(reportPath);
			Elements ps =doc.getElementsByAttributeValue("class", "entry-content").select("p");
			System.out.println(ps);
			String p1 = "";
			for(int i = 0; i < ps.size(); i++) {
				List<TextNode> pp = ps.get(i).textNodes();
				if(pp.size() != 0) {
					p1 += Jsoup.parse(ps.get(i).text()).text() + (i != ps.size() - 1 ? "\n" : "");
				}
			}
			System.out.println(p1);
			System.out.println("\n" + Jsoup.parse(ps.text()).text().replace("英语字母和英语音标有什么区别？", "#"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		this.writeJson(json.toString(), response);
	}

}
