"""empty message

Revision ID: 85e79b40ca2e
Revises: 74b67b392f32
Create Date: 2023-11-17 15:31:15.260394

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '85e79b40ca2e'
down_revision = '74b67b392f32'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('case__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cluster_id', sa.Integer(), nullable=True))
        batch_op.drop_index('ix_case__galaxy__tags_tag_id')
        batch_op.create_index(batch_op.f('ix_case__galaxy__tags_cluster_id'), ['cluster_id'], unique=False)
        batch_op.drop_column('tag_id')

    with op.batch_alter_table('case__template__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cluster_id', sa.Integer(), nullable=True))
        batch_op.drop_index('ix_case__template__galaxy__tags_tag_id')
        batch_op.create_index(batch_op.f('ix_case__template__galaxy__tags_cluster_id'), ['cluster_id'], unique=False)
        batch_op.drop_column('tag_id')

    with op.batch_alter_table('task__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cluster_id', sa.Integer(), nullable=True))
        batch_op.drop_index('ix_task__galaxy__tags_tag_id')
        batch_op.create_index(batch_op.f('ix_task__galaxy__tags_cluster_id'), ['cluster_id'], unique=False)
        batch_op.drop_column('tag_id')

    with op.batch_alter_table('task__template__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cluster_id', sa.Integer(), nullable=True))
        batch_op.drop_index('ix_task__template__galaxy__tags_tag_id')
        batch_op.create_index(batch_op.f('ix_task__template__galaxy__tags_cluster_id'), ['cluster_id'], unique=False)
        batch_op.drop_column('tag_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task__template__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tag_id', sa.INTEGER(), nullable=True))
        batch_op.drop_index(batch_op.f('ix_task__template__galaxy__tags_cluster_id'))
        batch_op.create_index('ix_task__template__galaxy__tags_tag_id', ['tag_id'], unique=False)
        batch_op.drop_column('cluster_id')

    with op.batch_alter_table('task__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tag_id', sa.INTEGER(), nullable=True))
        batch_op.drop_index(batch_op.f('ix_task__galaxy__tags_cluster_id'))
        batch_op.create_index('ix_task__galaxy__tags_tag_id', ['tag_id'], unique=False)
        batch_op.drop_column('cluster_id')

    with op.batch_alter_table('case__template__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tag_id', sa.INTEGER(), nullable=True))
        batch_op.drop_index(batch_op.f('ix_case__template__galaxy__tags_cluster_id'))
        batch_op.create_index('ix_case__template__galaxy__tags_tag_id', ['tag_id'], unique=False)
        batch_op.drop_column('cluster_id')

    with op.batch_alter_table('case__galaxy__tags', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tag_id', sa.INTEGER(), nullable=True))
        batch_op.drop_index(batch_op.f('ix_case__galaxy__tags_cluster_id'))
        batch_op.create_index('ix_case__galaxy__tags_tag_id', ['tag_id'], unique=False)
        batch_op.drop_column('cluster_id')

    # ### end Alembic commands ###
