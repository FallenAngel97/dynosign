#include "layerslistmodel.h"

#include <QDebug>


LayersListModel::LayersListModel(const std::vector<Layer*>& layers, QObject *parent) : QAbstractListModel (parent)
{
    layers_ = layers;
}

QVariant LayersListModel::data(const QModelIndex &index, int role) const
{
    if(!index.isValid()) return QVariant();
    if(index.row() >= layers_.size()) return QVariant();
    if (role == Qt::DisplayRole) return QVariant(layers_.at(index.row())->getName());

        return QVariant();
}

int LayersListModel::rowCount(const QModelIndex &parent) const
{
    return layers_.size();
}

void LayersListModel::addLayer(Layer *layer)
{
    beginInsertRows(QModelIndex(), 0, 0);
    layers_.insert(layers_.begin(), layer);
    endInsertRows();
}

void LayersListModel::removeLayer(int layerIndex)
{
    beginRemoveRows(QModelIndex(), 0, 0);
    layers_.erase(layers_.begin()+layerIndex);
    endRemoveRows();
}

