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
    if (role == Qt::DisplayRole || role == Qt::EditRole) return QVariant(layers_.at(index.row())->getName());

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

Qt::ItemFlags LayersListModel::flags(const QModelIndex &index) const
{
    if (!index.isValid())
        return Qt::ItemIsEnabled;

    return QAbstractItemModel::flags(index) | Qt::ItemIsEditable;
}

bool LayersListModel::setData(const QModelIndex &index,
                           const QVariant &value, int role)
{
    if (index.isValid() && role == Qt::EditRole) {
        layers_.at(index.row())->setName(value.toString());

        emit dataChanged(index, index);
        return true;
    }
    return false;
}
