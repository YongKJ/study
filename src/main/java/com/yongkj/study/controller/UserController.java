package com.yongkj.study.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongkj.study.basic.controller.BasicController;
import com.yongkj.study.dto.CollectionDto;
import com.yongkj.study.dto.UserDto;
import com.yongkj.study.dto.VocabularyDto;
import com.yongkj.study.service.CollectionService;
import com.yongkj.study.service.UserService;
import com.yongkj.study.service.VocabularyService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/user")
public class UserController extends BasicController {
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("vocabularyService")
	private VocabularyService vocabularyService;
	
	@Autowired
	@Qualifier("collectionService")
	private CollectionService collectionService;
	
	@ModelAttribute
	@RequestMapping("/register")
	public void userRegister(HttpServletRequest request,HttpServletResponse response, String userName, String userPassword, String userSex, String userAge, String userEmail) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserName(userName);
		if(userDto != null) {
			json.put("message", "注册失败！用户已存在！");
		}else {
			json.put("message", "注册成功！");
			
			String userUUID = this.getUUID();
			String md5Password = this.md5(userPassword);
			String userHeadPortraitPath = "img/default.jpg";
			String userRegTime = this.getStringDate(new Date());
			String admin = "0";
			
			UserDto userDtoNew = new UserDto();
			userDtoNew.setUserUUID(userUUID);
			userDtoNew.setUserName(userName);
			userDtoNew.setUserPassword(md5Password);
			userDtoNew.setUserSex(userSex);
			userDtoNew.setUserAge(Integer.valueOf(userAge));
			userDtoNew.setUserEmail(userEmail);
			userDtoNew.setUserHeadPortraitPath(userHeadPortraitPath);
			userDtoNew.setUserRegTime(userRegTime);
			userDtoNew.setAdmin(admin);
			userService.addUser(userDtoNew);
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/login")
	public void userLogin(HttpServletRequest request,HttpServletResponse response, String userName, String userPassword) throws Exception {
		JSONObject json = new JSONObject();
		
		String md5Password = this.md5(userPassword);
		UserDto userDto = userService.getUserDtoByUserNameAndUserPassword(userName, md5Password);
		if(userDto == null) {
			json.put("message", "登录失败！用户不存在！");
		}else {
			json.put("message", "登录成功！");
			json.put("userName", userDto.getUserName());
			
			String userLoginTime = this.getStringDate(new Date());
			userService.modUserLoginTimeByUserUUID(userLoginTime, userDto.getUserUUID());
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/manageLogin")
	public void manageLogin(HttpServletRequest request,HttpServletResponse response, String userName, String userPassword) throws Exception {
		JSONObject json = new JSONObject();
		
		String md5Password = this.md5(userPassword);
		UserDto userDto = userService.getUserDtoByUserNameAndUserPassword(userName, md5Password);
		if(userDto == null) {
			json.put("message", "登录失败！用户不存在！");
		}else {
			if(userDto.getUserName().equals("admin")) {
				json.put("message", "登录成功！");
				json.put("userUUID", userDto.getUserUUID());
			}else {
				json.put("message", "登录失败！不是管理员账号！");
			}
			
			String userLoginTime = this.getStringDate(new Date());
			userService.modUserLoginTimeByUserUUID(userLoginTime, userDto.getUserUUID());
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/manageAutoLogin")
	public void manageLogin(HttpServletRequest request,HttpServletResponse response, String userUUID) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserUUID(userUUID);
		
		if(userDto != null) {
			String userLoginTime = this.getStringDate(new Date());
			userService.modUserLoginTimeByUserUUID(userLoginTime, userDto.getUserUUID());
			
			json.put("message", "自动登录成功！");
		}else {
			json.put("message", "自动登录失败！错误的账户ID！");
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getUsersList")
	public void getUsersList(HttpServletRequest request,HttpServletResponse response, int page, String limit) throws Exception {
		JSONObject json = new JSONObject();
        json.put("code", 0);
        json.put("msg", "");
		
        int pageSize = Integer.valueOf(limit);
        int start = -1;
        int end = -1;

        List<UserDto> userDtosList = userService.getUserDtosList();
        json.put("count", userDtosList.size());
        
        int listSum = userDtosList.size();
        start = (page - 1) * pageSize;
        end = start + pageSize <= listSum ? start + pageSize : listSum;

        List<UserDto> userDtosListPage = new ArrayList<>();
        for(int i = start; i < end; i++) {
        	userDtosListPage.add(userDtosList.get(i));
        }
        json.put("data", userDtosListPage);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getUserByUserUUID")
	public void getUserByUserUUID(HttpServletRequest request,HttpServletResponse response, String userUUID) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		UserDto userDto = userService.getUserDtoByUserUUID(userUUID);
		json.put("userDto", userDto);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/modUserByUserUUID")
	public void modUserByUserUUID(HttpServletRequest request,HttpServletResponse response, String userUUID, String password) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		String md5Password = this.md5(password);
		userService.modUserPasswordByUserUUID(md5Password, userUUID);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/delUserByUserUUID")
	public void delUserByUserUUID(HttpServletRequest request,HttpServletResponse response, String userUUID) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		collectionService.delCollectionDtoByUserUUID(userUUID);
		vocabularyService.delVocabularyDtoByUserUUID(userUUID);
		userService.delUserDtoByUserUUID(userUUID);
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/addVocabulary")
	public void addUserVocabulary(HttpServletRequest request,HttpServletResponse response, String userName, String English, String Chinese) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserName(userName);
		if(userDto == null) {
			json.put("message", "添加失败！用户不存在！");
		}else {
			VocabularyDto vocabularyDtoCheck = vocabularyService.getVocabularyDtoByUserUUIDAndVocabularyTitle(userDto.getUserUUID(), English);
			
			if(vocabularyDtoCheck == null) {
				json.put("message", "添加成功！");
				
				String userUUID = userDto.getUserUUID();
				String vocabularyUUID = this.getUUID();
				VocabularyDto vocabularyDto = new VocabularyDto();
				vocabularyDto.setVocabularyUUID(vocabularyUUID);
				vocabularyDto.setUserUUID(userUUID);
				vocabularyDto.setVocabularyTitle(English);
				vocabularyDto.setVocabularyContent(Chinese);
				vocabularyDto.setVocabularyCategory("userCollection");
				vocabularyDto.setVocabularyAddTime(this.getStringDate(new Date()));
				vocabularyService.addVocabulary(vocabularyDto);
				
				CollectionDto collectionDto = new CollectionDto();
				collectionDto.setUserUUID(userUUID);
				collectionDto.setVocabularyUUID(vocabularyUUID);
				collectionDto.setCollectionAddTime(this.getStringDate(new Date()));
				collectionService.addCollectionDtoByUserUUIDAndVocabularyUUID(collectionDto);
				
				json.put("vocabularyUUID", vocabularyUUID);
			}else {
				json.put("message", "添加失败！单词已存在！");
				json.put("vocabularyUUID", vocabularyDtoCheck.getVocabularyUUID());
			}
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/checkVocabulary")
	public void checkVocabulary(HttpServletRequest request,HttpServletResponse response, String userName, String English) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserName(userName);
		if(userDto == null) {
			json.put("message", "查询失败！用户不存在！");
		}else {
			String userUUID = userDto.getUserUUID();
			VocabularyDto vocabularyDto = vocabularyService.getVocabularyDtoByUserUUIDAndVocabularyTitle(userUUID, English);
			if(vocabularyDto != null) {
				json.put("message", "查询成功！");
				json.put("vocabularyUUID", vocabularyDto.getVocabularyUUID());
			}else {
				json.put("message", "查询失败！单词不存在！");
				json.put("vocabularyUUID", "#");
			}
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/delVocabulary")
	public void delUserVocabulary(HttpServletRequest request,HttpServletResponse response, String userName, String vocabularyUUID) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserName(userName);
		if(userDto == null) {
			json.put("message", "删除失败！用户不存在！");
		}else {
			json.put("message", "删除成功！");
			
			String userUUID = userDto.getUserUUID();
			collectionService.delCollectionDtoByUserUUIDAndVocabularyUUID(userUUID, vocabularyUUID);
//			System.out.println(userUUID + "--------------" + vocabularyUUID);
			
			vocabularyService.delVocabularyDtoByVocabularyUUID(vocabularyUUID);
		}
		
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getVocabulary")
	public void getUserVocabularyList(HttpServletRequest request,HttpServletResponse response, String userName, String p) throws Exception {
		JSONObject json = new JSONObject();
		
		UserDto userDto = userService.getUserDtoByUserName(userName);
		if(userDto == null) {
			json.put("message", "获取失败！用户不存在！");
		}else {
			json.put("message", "获取成功！");
			
			int pageSum = 1;
			int page = 1;
			int pageSize = 10;
			int start = -1;
			int end = -1;
			
			String userUUID = userDto.getUserUUID();
			List<VocabularyDto> allVocabularyDtosList = vocabularyService.getVocabularyDtosByUserUUIDAndVocabularyCategory(userUUID, "userCollection");
			
//			System.out.println(allVocabularyDtosList.size());
			
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
		}
		
		this.writeJson(json.toString(), response);
	}
	
}
