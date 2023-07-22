# 此文档记录开发过程中的一些有意思的技巧

## Umi

### 1. umi generate component xxxxx

- xxxx 是指相对于 src/components 文件夹路径的指定路径，默认在此文件夹下，
- ../可以往上层找
- 同时创建多个空格隔开

### 2. model

- 公共 model 分类放在 src/models 文件夹下
- 服务端返回的 model 依据服务不同放在不同服务的不同文件夹下，并根据不同接口的 namespace 再做细分
- page 自己的类型维护在自己的文件夹下 .ts 文件中
