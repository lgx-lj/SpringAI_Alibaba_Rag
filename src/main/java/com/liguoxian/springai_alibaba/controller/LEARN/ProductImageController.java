package com.liguoxian.springai_alibaba.controller.LEARN;

import com.alibaba.cloud.ai.dashscope.chat.DashScopeChatModel;
import com.alibaba.cloud.ai.dashscope.image.DashScopeImageOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productImage")
public class ProductImageController {
    private static final Logger logger = LoggerFactory.getLogger(ProductImageController.class);
    private final ImageModel imageModel;
    private final ChatClient chatClient;

    public ProductImageController(ImageModel imageModel, DashScopeChatModel dashScopeChatModel) {
        this.imageModel = imageModel;
        this.chatClient = ChatClient.builder(dashScopeChatModel).build();
    }

    public record ProductImageRequest(
            String productName,
            String style,
            String productDescription
    ) {}

    public record ProductImageResult(
            String prompt,
            String imageUrl
    ) {}

    @RequestMapping("/generate")
    public ProductImageResult generate(@RequestBody ProductImageRequest request) {
        logger.info("=== 开始生成图片 ===");
        logger.info("商品名称：{}", request.productName());
        logger.info("商品描述：{}", request.productDescription());
        logger.info("风格要求：{}", request.style());

        // 第一步：ChatClient 把商品信息转成专业的英文绘画 Prompt
        logger.info("第一步：生成英文 prompt...");
        String imagePrompt = chatClient.prompt()
                .system("""
                        你是一个专业的 AI 绘画 prompt 工程师。
                        根据商品信息，生成一段用于 AI 图片生成的英文 prompt。
                        要求：用英文写，50-100 词，包含商品外观特征、背景、光线、风格，
                        商业摄影风格，适合电商展示。只输出 prompt 文本，不要其他内容。
                        """)
                .user(String.format(
                        "商品名称：%s\n商品描述：%s\n风格要求：%s",
                        request.productName(),
                        request.productDescription(),
                        request.style()))
                .call()
                .content();

        logger.info("生成的 prompt: {}", imagePrompt);

        // 第二步：用 Prompt 生成图片
        logger.info("第二步：调用 ImageModel 生成图片...");
        ImageResponse imageResponse = imageModel.call(
                new ImagePrompt(
                        imagePrompt,
                        DashScopeImageOptions.builder()
                                .withModel("wanx2.1-t2i-plus")
                                .withN(1)
                                .withWidth(1024)
                                .withHeight(1024)
                                .build()
                )
        );

        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        logger.info("生成的图片 URL: {}", imageUrl);
        logger.info("=== 图片生成完成 ===");

        return new ProductImageResult(imagePrompt, imageUrl);
    }
}

   