#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd


# In[2]:


data = pd.read_csv("cardio_train.csv",sep=";")


# In[3]:


data


# In[4]:


data.head()


# In[5]:


data.info()


# In[6]:


data.tail(5)


# In[7]:


#avarage age in this data set

data['age'].mean()


# In[8]:


#here age in days so convert into years

data['age_in_year'] = (data['age']/365).astype('int64')


# In[9]:


data['age_in_year'].mean()


# In[10]:


data['ap_hi'].mean()


# In[11]:


data['ap_hi'].median()


# In[12]:


data['ap_lo'].mean()


# In[13]:


data['ap_lo'].median()


# In[14]:


# Women with heart disease

women_with_cardio = data[(data['gender'] == 1) & (data['cardio'] == 1)].shape[0]
women_with_cardio


# In[15]:


#men_with_heart disease
men_with_cardio = data[(data['gender'] == 2) & (data['cardio'] == 1)].shape[0]
men_with_cardio


# In[16]:


# What percentage of people have cholesterol = 3 (well above normal)?
(data[data['cholesterol']==3].shape[0]/data.shape[0])*100


# In[17]:


#how many people are smokers
data[data['smoke']==1].shape[0]


# In[18]:


#how many people are non-smokers
data[data['smoke']==0].shape[0]


# In[19]:


#how many patient with high glucose,high cholesterol and cardio = 1

subset = data[(data['cholesterol'] == 3)&(data['gluc'] == 3)&(data['cardio'] == 1)]

count = subset.shape[0]

(count/data.shape[0])*100


# In[20]:


#Does physical activity (active) reduce the chance of having cardio = 1?

acti = data.groupby('active')['cardio'].mean()
acti


# In[30]:


data[data['height']>=250]


# In[40]:


data[(data['weight']>=200)|(data['weight']<=30)]


# In[42]:


data['ap_hi'].value_counts()


# In[44]:


data[(data['ap_hi'] <= 70) | (data['ap_hi'] >= 250)]


# In[ ]:




