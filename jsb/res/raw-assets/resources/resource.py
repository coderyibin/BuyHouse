# -*- coding: utf-8 -*-

import os
path='./'
files = []

def file_extension(path):
  return os.path.splitext(path)[1]

#遍历文件
def path_file () :
    for dirpath,dirnames,filenames in os.walk(path):#三个参数：分别返回1.父目录 2.所有文件夹名字（不含路径） 3.所有文件名字
        for file in filenames:                      #输出文件信息
            #资源配置文件不做处理
            if file != "resources.json":
                files.append(file)
            if file_extension(file) != ".meta":
                fullpath=os.path.join(dirpath,file) #输出文件路径信息
                # print fullpath


# 处理json文件
def parsing_JSON():
    for i in files:
        f = file_extension(i)
        if f == ".json":
            main = i.replace(".json", "")
            print (main)
            file_object = open(i)
            try:
                all_the_text = file_object.read()
            finally:
                file_object.close()
            file_ = open("Data.ts", 'a')
            str = 'let ' + main + ' : string = ' + all_the_text
            file_.write(str)
            file_.close()

def parsing_IMAGE () :
    return