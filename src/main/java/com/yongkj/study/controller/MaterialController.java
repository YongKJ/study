package com.yongkj.study.controller;

import com.yongkj.study.basic.controller.BasicController;
import com.yongkj.study.dto.MaterialDto;
import com.yongkj.study.dto.PictureDto;
import com.yongkj.study.service.MaterialService;
import com.yongkj.study.service.PictureService;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/material")
public class MaterialController extends BasicController {

    @Autowired
    @Qualifier("materialService")
    private MaterialService materialService;
    
    @Autowired
    @Qualifier("pictureService")
    private PictureService pictureService;

    @ModelAttribute
    @RequestMapping("/getMaterialsList")
    public void getMaterialList(HttpServletRequest request, HttpServletResponse response, String p) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        int pageSum = 1;
        int page = 1;
        int pageSize = 10;
        int start = -1;
        int end = -1;

        List<MaterialDto> materialDtoLists = materialService.getMaterialDtoByMaterialCategoryOrderByMaterialAddTime("article-%");

        int listSum = materialDtoLists.size();
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

        List<MaterialDto> materialDtoListsNew = new ArrayList<>();
        for(int i = start; i < end; i++) {
        	List<PictureDto> pictureDtosList = pictureService.getPictureDtoByMaterialUUID(materialDtoLists.get(i).getMaterialUUID());
        	materialDtoLists.get(i).setPictureDtosList(pictureDtosList);
            materialDtoListsNew.add(materialDtoLists.get(i));
        }
        json.put("materialDtosList", materialDtoListsNew);


        json.put("page", page);
        json.put("pageSum", pageSum);

        this.writeJson(json.toString(), response);
    }
    
    @ModelAttribute
    @RequestMapping("/getManageMaterialList")
    public void getManageMaterialList(HttpServletRequest request, HttpServletResponse response, int page, String limit) throws Exception {
        JSONObject json = new JSONObject();
        json.put("code", 0);
        json.put("msg", "");
		
        int pageSize = Integer.valueOf(limit);
        int start = -1;
        int end = -1;

        List<MaterialDto> materialDtosList = materialService.getMaterialDtoByMaterialCategoryOrderByMaterialAddTime("article-%");
        json.put("count", materialDtosList.size());
        
        int listSum = materialDtosList.size();
        start = (page - 1) * pageSize;
        end = start + pageSize <= listSum ? start + pageSize : listSum;

        List<MaterialDto> materialDtosListPage = new ArrayList<>();
        for(int i = start; i < end; i++) {
        	materialDtosListPage.add(materialDtosList.get(i));
        }
        json.put("data", materialDtosListPage);

        this.writeJson(json.toString(), response);
    }
    
    @ModelAttribute
    @RequestMapping("/uploadArticlePicture")
    public void uploadArticlePicture(HttpServletRequest request, HttpServletResponse response, @RequestParam("picture") MultipartFile picture) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");
        
        String realPath = "";
        if(System.getProperty("os.name").contains("dows")) {
        	realPath = ResourceUtils.getURL("classpath:").getPath();
//        	System.out.println("Windows Path: " + realPath);
        }else {
        	realPath = new File(ResourceUtils.getURL("classpath:").getPath()).getParentFile().getParentFile().getParent().replace("file:", "");
//        	System.out.println("Linux getParent(): " + realPath);
//        	System.out.println("Linux getPath(): " + new File(ResourceUtils.getURL("classpath:").getPath()).getParentFile().getParentFile().getPath());
        }
        
        String uploadPath = realPath + File.separator + "static" + File.separator + "upload" + File.separator + "img";
        File upload = new File(uploadPath);
        if(!upload.exists()) {
        	upload.mkdirs();
        }
        
//        System.out.println("uploadPath: " + uploadPath);
        
        String pictureUUID = this.getUUID();
        String filePath = uploadPath + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        picture.transferTo(new File(filePath));
        
//        System.out.println("filePath: " + filePath);
        
        String picturePath = "upload" + File.separator + "img" + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        json.put("picturePath", picturePath);
        
        this.writeJson(json.toString(), response);
    }

    @ModelAttribute
    @RequestMapping("/getMaterial")
    public void getMaterial(HttpServletRequest request, HttpServletResponse response, String materialUUID) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        MaterialDto materialDto = materialService.getMaterialDtoByMaterialUUID(materialUUID);
        json.put("materialDto", materialDto);

        this.writeJson(json.toString(), response);
    }
    
    @ModelAttribute
    @RequestMapping("/getArticle")
    public void getArticle(HttpServletRequest request, HttpServletResponse response, String materialUUID) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");
        
        List<MaterialDto> materialDtoLists = materialService.getMaterialDtoByMaterialCategoryOrderByMaterialAddTime("article-%");
        for(int i = 0; i < materialDtoLists.size(); i++) {
        	if(materialDtoLists.get(i).getMaterialUUID().equals(materialUUID)) {
        		json.put("materialDto", materialDtoLists.get(i));

        		String nextMaterialUUID = "";
        		String nextMaterialTitle = "";
        		String preMaterialUUID = "";
        		String preMaterialTitle = "";
        		
        		if(0 <= i - 1) {
        			nextMaterialUUID = materialDtoLists.get(i - 1).getMaterialUUID();
        			nextMaterialTitle = materialDtoLists.get(i - 1).getMaterialTitle();
        		}
        		if(i + 1 < materialDtoLists.size()) {
        			preMaterialUUID = materialDtoLists.get(i + 1).getMaterialUUID();
        			preMaterialTitle = materialDtoLists.get(i + 1).getMaterialTitle();
        		}
        		
        		json.put("nextMaterialUUID", nextMaterialUUID);
        		json.put("nextMaterialTitle", nextMaterialTitle);
        		json.put("preMaterialUUID", preMaterialUUID);
        		json.put("preMaterialTitle", preMaterialTitle);
        	}
        }

        this.writeJson(json.toString(), response);
    }
    
    @ModelAttribute
    @RequestMapping("/getMaterialPicture")
    public void getMaterialPicture(HttpServletRequest request, HttpServletResponse response, String materialUUID) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        PictureDto pictureDto = pictureService.getPictureDtoByMaterialUUID(materialUUID).get(0);
        json.put("pictureDto", pictureDto);

        this.writeJson(json.toString(), response);
    }
    
    @ModelAttribute
    @RequestMapping("/modMaterialPicture")
    public void modMaterialPicture(HttpServletRequest request, HttpServletResponse response, @RequestParam("materialUUID") String materialUUID, @RequestParam("picture") MultipartFile picture) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        PictureDto pictureDto = pictureService.getPictureDtoByMaterialUUID(materialUUID).get(0);
        String pictureUUID = pictureDto.getPictureUUID();
        String picturePath = pictureDto.getPicturePath();
        
        String realPath = "";
        if(System.getProperty("os.name").contains("dows")) {
        	realPath = ResourceUtils.getURL("classpath:").getPath();
        }else {
        	realPath = new File(ResourceUtils.getURL("classpath:").getPath()).getParentFile().getParentFile().getParent().replace("file:", "");
        }
        
        String uploadPath = realPath + File.separator + "static" + File.separator + "upload" + File.separator + "img";
        File upload = new File(uploadPath);
        if(!upload.exists()) {
        	upload.mkdirs();
        }
        
        String oldFilePath = realPath + File.separator + "static" + File.separator + picturePath;
        File oldPicture = new File(oldFilePath);
        if(oldPicture.exists()) {
            FileUtils.deleteQuietly(oldPicture);
        }
        
        String filePath = uploadPath + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        picture.transferTo(new File(filePath));
        
        String newPicurePath = "upload" + File.separator + "img" + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        pictureDto.setPicturePath(newPicurePath);
        pictureService.modPicturePath(pictureDto);
        
        json.put("pictureDto", pictureDto);

        this.writeJson(json.toString(), response);
    }

    @ModelAttribute
    @RequestMapping("/addMaterial")
    public void addMaterial(HttpServletRequest request, HttpServletResponse response, @RequestParam("materialTitle") String materialTitle, @RequestParam("materialContent") String materialContent, @RequestParam("materialCategory") String materialCategory, @RequestParam("picture") MultipartFile picture) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        String materialUUID = this.getUUID();
        String userUUID = "32b3d188a504438f8d867bc86afbdeb7";
        String materialAddTime = this.getStringDate(new Date());

        MaterialDto materialDto = new MaterialDto();
        materialDto.setMaterialUUID(materialUUID);
        materialDto.setUserUUID(userUUID);
        materialDto.setMaterialTitle(materialTitle);
        materialDto.setMaterialContent(materialContent);
        materialDto.setMaterialCategory(materialCategory);
        materialDto.setMaterialAddTime(materialAddTime);
        materialService.addMaterial(materialDto);
        
        String pictureUUID = this.getUUID();
        String picturePath = "upload" + File.separator + "img" + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        PictureDto pictureDto = new PictureDto();
        pictureDto.setPictureUUID(pictureUUID);
        pictureDto.setMaterialUUID(materialUUID);
        pictureDto.setPictureContent(materialTitle);
        pictureDto.setPicturePath(picturePath);
        pictureDto.setPictureAddTime(materialAddTime);
        pictureService.addPicture(pictureDto);
        
        String realPath = "";
        if(System.getProperty("os.name").contains("dows")) {
        	realPath = ResourceUtils.getURL("classpath:").getPath();
        }else {
        	realPath = new File(ResourceUtils.getURL("classpath:").getPath()).getParentFile().getParentFile().getParent().replace("file:", "");
        }
        
        String uploadPath = realPath + File.separator + "static" + File.separator + "upload" + File.separator + "img";
        File upload = new File(uploadPath);
        if(!upload.exists()) {
        	upload.mkdirs();
        }
        
        String filePath = uploadPath + File.separator + pictureUUID + "-" + picture.getOriginalFilename();
        picture.transferTo(new File(filePath));

        json.put("picturePath", picturePath);
        this.writeJson(json.toString(), response);
    }

    @ModelAttribute
    @RequestMapping("/modMaterial")
    public void modMaterial(HttpServletRequest request, HttpServletResponse response, String materialUUID, String materialTitle, String materialContent, String materialCategory) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        MaterialDto materialDto = new MaterialDto();
        materialDto.setMaterialUUID(materialUUID);
        materialDto.setMaterialTitle(materialTitle);
        materialDto.setMaterialContent(materialContent);
        materialDto.setMaterialCategory(materialCategory);
        materialService.modMaterial(materialDto);
        
        PictureDto pictureDto = pictureService.getPictureDtoByMaterialUUID(materialUUID).get(0);
        pictureDto.setPictureContent(materialTitle);
        pictureService.modPictureContent(pictureDto);

        this.writeJson(json.toString(), response);
    }

    @ModelAttribute
    @RequestMapping("/delMaterial")
    public void delMaterial(HttpServletRequest request, HttpServletResponse response, String materialUUID) throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");
        
        PictureDto pictureDto = pictureService.getPictureDtoByMaterialUUID(materialUUID).get(0);
        String picturePath = pictureDto.getPicturePath();
        
        String realPath = "";
        if(System.getProperty("os.name").contains("dows")) {
        	realPath = ResourceUtils.getURL("classpath:").getPath();
        }else {
        	realPath = new File(ResourceUtils.getURL("classpath:").getPath()).getParentFile().getParentFile().getParent().replace("file:", "");
        }
        
        String oldFilePath = realPath + File.separator + "static" + File.separator + picturePath;
        File oldPicture = new File(oldFilePath);
        if(oldPicture.exists()) {
            FileUtils.deleteQuietly(oldPicture);
        }

        pictureService.delPicture(materialUUID);
        materialService.delMaterial(materialUUID);

        this.writeJson(json.toString(), response);
    }

}
