package com.example.cloud.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "文件列表DTO",required = true)
public class FileListDo {
    @Schema(description = "文件路径")
    private String filePath;
    @Schema(description = "当前页码")
    private Long currentPage;
    @Schema(description = "一页显示数量")
    private Long pageCount;
    @Schema(description = "文件类型")
    private int fileType;
}
