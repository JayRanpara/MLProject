#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
from sklearn.preprocessing import StandardScaler,OneHotEncoder


# In[2]:


df = pd.read_csv("cardio_train.csv",sep=";")


# In[3]:


df.head()


# In[4]:


df.drop("id",axis=1,inplace=True)


# In[5]:


df['age']=df['age']//365


# In[6]:


df['gender'] = df['gender'].map({1:0,2:1})


# In[7]:


df.tail()


# In[8]:


df["cholesterol"] = df["cholesterol"].map({1:0, 2:1, 3:2})
df["gluc"] = df["gluc"].map({1:0, 2:1, 3:2})


# In[9]:


df = pd.get_dummies(df, columns=["alco","active"], drop_first=True)#nominal data 
#one hot encoding


# In[10]:


df


# # handling outliers

# In[11]:


df = df[df['height']<250]


# In[12]:


df = df[(df['weight'] > 30) & (df['weight'] < 200)]


# In[13]:


# Clean systolic BP (ap_hi)
df = df[(df['ap_hi'] >= 70) & (df['ap_hi'] <= 250)]

# Clean diastolic BP (ap_lo)
df = df[(df['ap_lo'] >= 40) & (df['ap_lo'] <= 150)]


# In[14]:


scaler = StandardScaler()
num_cols = ["age","height","weight","ap_hi","ap_lo"]
df[num_cols] = scaler.fit_transform(df[num_cols])


# In[15]:


df


# In[16]:


X = df.drop(columns='cardio')
Y = df['cardio']


# In[17]:


X


# In[18]:


Y


# In[19]:


import matplotlib.pyplot as plt

plt.scatter(df['cholesterol'],df['gluc'],c=df['cardio'],alpha=.6)
plt.xlabel("Cholesterol")
plt.ylabel("Glucose")
plt.colorbar(label="Cardio")
plt.show()


# In[20]:


plt.scatter(df['ap_hi'], df['ap_lo'], c=df['cardio'], cmap='coolwarm', alpha=0.6)
plt.xlabel("Systolic BP (ap_hi)")
plt.ylabel("Diastolic BP (ap_lo)")
plt.title("Blood Pressure Colored by Cardio")
plt.colorbar(label="Cardio")
plt.show()


# In[21]:


from sklearn.model_selection import train_test_split
X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size = 0.2)


# In[22]:


from sklearn.linear_model import LogisticRegression


# In[23]:


clf = LogisticRegression()


# In[24]:


clf.fit(X_train,Y_train)

# Save the trained model and the preprocessing information needed for predictions.
from joblib import dump

model_bundle = {
    "model": clf,
    "scaler": scaler,
    "feature_names": X.columns.tolist(),
}

dump(model_bundle, "cardio_model.pkl")

print("Model saved to cardio_model.pkl")


# In[25]:


y_pred = clf.predict(X_test)


# In[26]:


y_pred


# In[27]:


from sklearn.metrics import accuracy_score


# In[28]:


accuracy_score(Y_test,y_pred)


# In[29]:


clf.intercept_


# In[30]:


clf.coef_


# In[ ]:





# In[31]:


import numpy as np
from sklearn.metrics import accuracy_score


X_train_bias = np.c_[np.ones(X_train.shape[0]), X_train].astype(np.float64)
Y_train = np.array(Y_train, dtype=np.float64)

theta = np.zeros(X_train_bias.shape[1])


def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def compute_cost(X, y, theta):
    m = len(y)
    h = sigmoid(X @ theta)
    return -(1/m) * np.sum(y*np.log(h) + (1-y)*np.log(1-h))


def gradient_descent(X, y, theta, alpha, iterations):
    m = len(y)
    cost_history = []
    for _ in range(iterations):
        h = sigmoid(X @ theta)
        gradient = (1/m) * (X.T @ (h - y))
        theta -= alpha * gradient
        cost_history.append(compute_cost(X, y, theta))
    return theta, cost_history

theta_final, cost_history = gradient_descent(X_train_bias, Y_train, theta, alpha=0.01, iterations=1000)

print("Final θ values:", theta_final)
print("Final Cost:", cost_history[-1])


X_test_bias = np.c_[np.ones(X_test.shape[0]), X_test].astype(np.float64)
y_pred_prob = sigmoid(X_test_bias @ theta_final)
y_pred_manual = (y_pred_prob >= 0.5).astype(int)

print("Manual Gradient Descent Accuracy:", accuracy_score(Y_test, y_pred_manual))


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




