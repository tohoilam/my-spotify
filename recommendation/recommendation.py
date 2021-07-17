import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
import seaborn as sns
import spotipy
import os
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.manifold import TSNE

spotify_data = pd.read_csv('../music_data/data_o.csv')
genre_data = pd.read_csv('../music_data/data_by_genres_o.csv')
data_by_year = pd.read_csv('../music_data/data_by_year_o.csv')

### Audio features over the past 100 years
# sound_features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'valence']
# fig = px.line(data_by_year, x='year', y=sound_features)

### Tempo or Speed of music over time
# fig = px.line(data_by_year, x='year', y='tempo')

### Top 10 genres characteristics
# top10_genres = genre_data.nlargest(10, 'popularity')
# fig = px.bar(top10_genres, x='genres', y=['valence', 'energy', 'danceability', 'acousticness'], barmode='group')

# fig.show()

cluster_pipeline = Pipeline([('scaler', StandardScaler()), ('kmeans', KMeans(n_clusters=10, n_jobs=-1))])
# Pipeline parameters:
# 1). Steps
#     List of (name, transform) tuples, to implement fit/transform
# 2). Memory=None
# 3). Verbose=False
# Standard Scaler = A feature transformer, scaling it by standardization
# KMeans = clustering, method of vector quantization (partition n observations into k clusters)

data = genre_data.select_dtypes(np.number) # Select all the data with data type as number

cluster_pipeline.fit(data) # Fit the data into the pipeline

genre_data['cluster'] = cluster_pipeline.predict(data)


tsne_pipeline = Pipeline([('Scaler', StandardScaler()), ('tsne', TSNE(n_components=2, verbose=2))])
# t-SNE = t-distributed Stochastic Neighbor Embedding --> tool to visualize high-deminsional data
genre_embedding = tsne_pipeline.fit_transform(data)

projection = pd.DataFrame(columns=['x', 'y'], data=genre_embedding)
# Two-dimensional, size-mutable, potentially heterogeneous tabular data

projection['genres'] = genre_data['genres']
projection['cluster'] = genre_data['cluster']

fig = px.scatter(projection, x='x', y='y', color='cluster', hover_data=['x', 'y', 'genres'])
fig.show()
