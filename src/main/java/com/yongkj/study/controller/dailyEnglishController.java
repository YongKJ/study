package com.yongkj.study.controller;

import com.yongkj.study.basic.controller.BasicController;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Controller
@RequestMapping("/dailyEnglish")
public class dailyEnglishController extends BasicController {

    @ModelAttribute
    @RequestMapping("/getDailyEnglish")
    public void getDailyEnglish(HttpServletRequest request, HttpServletResponse response, String date) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        String myurl = "http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=" + date;
        URL url = new URL(myurl);
        URLConnection urlConnection = url.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "utf-8"));

        StringBuilder dailyEnglishJson = new StringBuilder();
        String inputLine = null;
        while ((inputLine = in.readLine()) != null) {
            dailyEnglishJson.append(inputLine);
        }

        json.put("dailyEnglishData", dailyEnglishJson.toString());

        this.writeJson(json.toString(), response);
    }

}
