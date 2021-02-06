package com.yongkj.study.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongkj.study.basic.controller.BasicController;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("translate")
public class TranslateController extends BasicController {
	
	@ModelAttribute
	@RequestMapping("/testURL")
	public void testURL(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		File file = new File("src/main/resources/static/json/translate.json");
		FileInputStream fileInputStream = new FileInputStream(file);
		InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "utf-8");
		BufferedReader reader = new BufferedReader(inputStreamReader);
		
		StringBuilder jsonData = new StringBuilder();
		String inputLine = null;
		while ((inputLine = reader.readLine()) != null) {
			jsonData.append(inputLine);
		}
		reader.close();
		
		System.out.println(jsonData.toString());
        JSONObject translate = JSONObject.fromObject(jsonData.toString());
        String basic = translate.getJSONObject("translateData").getJSONObject("basic").getString("uk-speech");
        System.out.println(basic);
        
		json.put("jsonData", basic);
		this.writeJson(json.toString(), response);
	}
	
	@ModelAttribute
	@RequestMapping("/getTranslate")
	public void getEnglishTranslate(HttpServletRequest request,HttpServletResponse response, String q) throws Exception {
		JSONObject json = new JSONObject();
		json.put("message", "");
		
		Random random = new Random();
		
		String appKey = "1be05b3ac3f4a91e";
		String secretKey = "c4kFEi44fcL6ehkdkKdHhwh4JAAXCzgY";
		String fromLang = "EN";
		String toLang = "zh-CHS";
		String salt = String.valueOf(random.nextInt(65536) + 1);
		String sign = this.md5(appKey + q + salt + secretKey);
		String myurl = "http://openapi.youdao.com/api?appKey=" + appKey + "&q=" + URLEncoder.encode(q, "utf-8") + "&from=" + fromLang + "&to=" + toLang + "&salt=" + salt + "&sign=" + sign;
		
//		System.out.println(q + "-----------" + myurl);
		
		URL url = new URL(myurl);
		URLConnection urlConnection = url.openConnection();
		BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "utf-8"));
		
		StringBuilder translateJson = new StringBuilder();
		String inputLine = null;
		while ((inputLine = in.readLine()) != null) {
			translateJson.append(inputLine);
		}
		json.put("translateData", translateJson.toString());
		
		String us_voice_url = "http://dict.youdao.com/dictvoice?type=0&audio=" + URLEncoder.encode(q, "utf-8");
		String uk_voice_url = "http://dict.youdao.com/dictvoice?type=1&audio=" + URLEncoder.encode(q, "utf-8");
		String us_speech = null;
		String uk_speech = null;
		if(json.getJSONObject("translateData").has("basic")) {
			if(json.getJSONObject("translateData").getJSONObject("basic").has("us-speech")) {
				us_speech = json.getJSONObject("translateData").getJSONObject("basic").getString("us-speech");
			}
			if(json.getJSONObject("translateData").getJSONObject("basic").has("uk-speech")) {
				uk_speech = json.getJSONObject("translateData").getJSONObject("basic").getString("uk-speech");
			}
		}
		
		if(us_speech != null && uk_speech != null) {
			JSONObject translateData = json.getJSONObject("translateData");
			JSONObject basic = translateData.getJSONObject("basic");
//			System.out.println(basic);
			basic.put("us-speech", us_voice_url);
			basic.put("uk-speech", uk_voice_url);
//			System.out.println(basic);
//			translateData.remove("basic");
			translateData.put("basic", basic);
//			json.remove("translateData");
			json.put("translateData", translateData);
		}
		
		this.writeJson(json.toString(), response);
	}

}
