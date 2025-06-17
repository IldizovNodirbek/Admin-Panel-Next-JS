'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  addPost,
  updatePost,
  deletePost,
  setSearchTerm,
  setCategoryFilter,
  BlogPost,
} from '@/store/slices/blogSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BlogPostForm } from '@/components/forms/blog-post-form';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function BlogPage() {
  const dispatch = useDispatch();
  const { posts, searchTerm, categoryFilter } = useSelector((state: RootState) => state.blog);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(posts.map(p => p.category)));

  const handleAddPost = (postData: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch(addPost(newPost));
    toast.success('Blog post added successfully');
    setIsDialogOpen(false);
  };

  const handleUpdatePost = (postData: Omit<BlogPost, 'id' | 'createdAt'>) => {
    if (selectedPost) {
      const updatedPost: BlogPost = {
        ...selectedPost,
        ...postData,
      };
      dispatch(updatePost(updatedPost));
      toast.success('Blog post updated successfully');
      setSelectedPost(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeletePost = (id: string) => {
    dispatch(deletePost(id));
    toast.success('Blog post deleted successfully');
  };

  const openEditDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setSelectedPost(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPost ? 'Edit Blog Post' : 'Add New Blog Post'}
              </DialogTitle>
              <DialogDescription>
                {selectedPost 
                  ? 'Update the blog post information below.' 
                  : 'Create a new blog post with content and metadata.'
                }
              </DialogDescription>
            </DialogHeader>
            <BlogPostForm
              initialData={selectedPost}
              onSubmit={selectedPost ? handleUpdatePost : handleAddPost}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={(value) => dispatch(setCategoryFilter(value))}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
          <CardDescription>Manage your blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500">
                          {post.slug}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.category}</Badge>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'success' : 'warning'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}